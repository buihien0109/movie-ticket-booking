package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Schedule;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertScheduleRequest;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.repository.ScheduleRepository;
import com.example.movie.ticket.booking.application.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll(Sort.by("startDate").descending());
    }

    public Schedule getScheduleById(Integer id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch chiếu với id: " + id));
    }

    public Schedule saveSchedule(UpsertScheduleRequest request) {
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim với id: " + request.getMovieId()));

        // Tìm kiếm xem movie có lịch chiếu nào đang chiếu hoặc sắp chiếu không
        // Nếu movie đang chiếu hoặc sắp chiếu thì không thể tạo lịch chiếu mới
        List<Schedule> schedules = scheduleRepository.findByMovieIdAndEndDateAfter(request.getMovieId(), request.getStartDate());
        if (!schedules.isEmpty()) {
            throw new ResourceNotFoundException("Phim đang chiếu hoặc sắp chiếu không thể tạo lịch chiếu mới");
        }

        // Tạo lịch chiếu mới
        Schedule schedule = Schedule.builder()
                .movie(movie)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Integer id, UpsertScheduleRequest request) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch chiếu với id: " + id));

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim với id: " + request.getMovieId()));

        schedule.setMovie(movie);
        schedule.setStartDate(request.getStartDate());
        schedule.setEndDate(request.getEndDate());
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Integer id) {
        // Kiểm tra xem lịch chiếu có tồn tại không
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch chiếu với id: " + id));

        // Kiểm tra xem lịch chiếu đang có suất chiếu nào không
        Movie movie = schedule.getMovie();
        if (showtimeRepository.existsByMovie_Id(movie.getId())) {
            throw new ResourceNotFoundException("Không thể xóa lịch chiếu đang có suất chiếu");
        }

        // Xóa lịch chiếu
        scheduleRepository.delete(schedule);
    }
}
