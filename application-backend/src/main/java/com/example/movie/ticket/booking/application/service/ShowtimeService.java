package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.*;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertShowtimeRequest;
import com.example.movie.ticket.booking.application.model.response.ShowtimeResponse;
import com.example.movie.ticket.booking.application.repository.*;
import com.example.movie.ticket.booking.application.specification.ShowtimeSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShowtimeService {
    private final ShowtimeRepository showtimeRepository;
    private final CinemaRepository cinemaRepository;
    private final AuditoriumRepository auditoriumRepository;
    private final MovieRepository movieRepository;
    private final ScheduleRepository scheduleRepository;

    public List<ShowtimeResponse> getAllShowTimes(Integer cinemaId, Integer auditoriumId, String showDate) {
        List<ShowtimeResponse> responses = new ArrayList<>();

        if (cinemaId != null) {
            // Process a specific cinema
            Cinema cinema = cinemaRepository.findById(cinemaId)
                    .orElseThrow(() -> new ResourceNotFoundException("Cinema not found"));
            addCinemaToShowtimeResponse(cinema, auditoriumId, showDate, responses);
        } else {
            // Process all cinemas
            List<Cinema> cinemas = cinemaRepository.findAll();
            for (Cinema cinema : cinemas) {
                addCinemaToShowtimeResponse(cinema, null, showDate, responses);
            }
        }

        return responses;
    }

    private void addCinemaToShowtimeResponse(Cinema cinema, Integer auditoriumId, String showDate, List<ShowtimeResponse> responses) {
        List<ShowtimeResponse.AuditoriumResponse> auditoriumResponses = new ArrayList<>();

        List<Auditorium> auditoriums = auditoriumId != null ?
                auditoriumRepository.findById(auditoriumId).map(List::of).orElse(new ArrayList<>()) :
                auditoriumRepository.findByCinemaId(cinema.getId());

        for (Auditorium auditorium : auditoriums) {
            Specification<Showtime> specification = ShowtimeSpecification.filterShowtimes(cinema.getId(), auditorium.getId(), showDate);
            List<Showtime> showtimes = showtimeRepository.findAll(specification, Sort.by(Sort.Direction.ASC, "startTime"));

            auditoriumResponses.add(ShowtimeResponse.AuditoriumResponse.builder()
                    .auditorium(auditorium)
                    .showtimes(showtimes)
                    .build());
        }

        // This ensures that cinemas with no auditoriums are also included in the response with an empty list of auditoriums
        responses.add(ShowtimeResponse.builder()
                .cinema(cinema)
                .auditoriums(auditoriumResponses)
                .build());
    }

    public List<Showtime> getAllShowtimesByCinema(Integer cinemaId, String showDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate showDate = LocalDate.parse(showDateStr, formatter);
        LocalDate currentDate = LocalDate.now(ZoneId.systemDefault());

        List<Showtime> showtimes = showtimeRepository.findByAuditorium_Cinema_IdAndDate(cinemaId, showDate);

        if (showDate.isEqual(currentDate)) {
            // Nếu showDate là ngày hiện tại, lọc ra những showtime có startTime sau thời gian hiện tại
            LocalTime currentTime = LocalTime.now(ZoneId.systemDefault());
            return showtimes.stream()
                    .filter(showtime -> LocalTime.parse(showtime.getStartTime()).isAfter(currentTime))
                    .collect(Collectors.toList());
        } else {
            // Nếu showDate là ngày trong quá khứ hoặc tương lai, trả về tất cả showtime
            return showtimes;
        }
    }

    public Showtime createShowtimes(UpsertShowtimeRequest request) {
        log.info("Creating showtime: {}", request);
        Auditorium auditorium = auditoriumRepository.findById(request.getAuditoriumId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng chiếu có id = " + request.getAuditoriumId()));

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        // Kiểm tra xem movie có lịch chiếu trong ngày đã chọn chưa
        List<Schedule> schedules = scheduleRepository.findByMovie_Id(movie.getId());
        if (schedules.isEmpty()) {
            throw new BadRequestException("Phim chưa có lịch chiếu");
        }

        // Kiểm tra xem lịch chiếu đã hết hạn hay chưa dựa vào endDate của schedule với date trong request
        // Lặp qua từng schedule để kiểm tra
        for (Schedule schedule : schedules) {
            // Convert date từ request sang Date để so sánh với endDate của schedule
            Date dateRequest = Date.from(request.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
            if (schedule.getEndDate().before(dateRequest)) {
                throw new BadRequestException("Lịch chiếu đã hết hạn");
            }
        }

        // Kiểm tra xem ngày giờ trong request có nằm trong khoảng thời gian của showtime khác không
        List<Showtime> showtimes = showtimeRepository.findByAuditorium_IdAndDate(auditorium.getId(), request.getDate());
        for (Showtime showtime : showtimes) {
            if (isTimeOverlap(request.getStartTime(), request.getEndTime(),
                    showtime.getStartTime(), showtime.getEndTime())) {
                throw new BadRequestException("Thời gian chiếu đã bị trùng");
            }
        }

        Showtime showtime = Showtime.builder()
                .movie(movie)
                .auditorium(auditorium)
                .graphicsType(request.getGraphicsType())
                .translationType(request.getTranslationType())
                .date(request.getDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        return showtimeRepository.save(showtime);
    }

    private boolean isTimeOverlap(String start1, String end1, String start2, String end2) {
        // Kiểm tra xem hai khoảng thời gian có giao nhau không
        return (start1.compareTo(start2) >= 0 && start1.compareTo(end2) <= 0) ||
                (end1.compareTo(start2) >= 0 && end1.compareTo(end2) <= 0);
    }

    public List<Showtime> getShowtimesByMovie(Integer movieId, String showDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate showDate = LocalDate.parse(showDateStr, formatter);
        LocalDate currentDate = LocalDate.now(ZoneId.systemDefault());

        List<Showtime> showtimes = showtimeRepository.findByMovie_IdAndDate(movieId, showDate);

        if (showDate.isEqual(currentDate)) {
            // Nếu showDate là ngày hiện tại, lọc ra những showtime có startTime sau thời gian hiện tại
            LocalTime currentTime = LocalTime.now(ZoneId.systemDefault());
            return showtimes.stream()
                    .filter(showtime -> LocalTime.parse(showtime.getStartTime()).isAfter(currentTime))
                    .collect(Collectors.toList());
        } else {
            // Nếu showDate là ngày trong quá khứ hoặc tương lai, trả về tất cả showtime
            return showtimes;
        }
    }

    public Map<String, Boolean> checkMovieHasShowtimes(Integer id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + id));

        // Kiểm tra xem phim có lịch chiếu nào không trong 20 ngày. Tính từ ngày hiện tại trở về sau
        LocalDate currentDate = LocalDate.now(ZoneId.systemDefault());
        LocalDate endDate = currentDate.plusDays(20);

        boolean hasShowtimes = showtimeRepository.existsByMovie_IdAndDateBetween(id, currentDate, endDate);

        return Map.of("hasShowtimes", hasShowtimes);
    }
}
