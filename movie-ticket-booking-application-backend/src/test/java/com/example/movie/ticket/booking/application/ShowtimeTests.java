package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Schedule;
import com.example.movie.ticket.booking.application.entity.Showtime;
import com.example.movie.ticket.booking.application.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@SpringBootTest
public class ShowtimeTests {
    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CinemaRepository cinemaRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AuditoriumRepository auditoriumRepository;


    @Test
    public void save_showtimes() {
        Random random = new Random();
        List<Schedule> schedules = scheduleRepository.findByMovie_StatusAndStartDateBeforeAndEndDateAfter(true, new Date(), new Date());
        List<Movie> movies = schedules.stream().map(Schedule::getMovie).toList();
        List<Auditorium> auditoriums = auditoriumRepository.findAll();
        List<Showtime> newShowtimes = new ArrayList<>();

        for (Auditorium auditorium : auditoriums) {
            int numberOfShowtimes = 3 + random.nextInt(3);  // Between 3 and 5 showtimes

            LocalTime showtimeStart = LocalTime.of(8, 0);  // Start at 8:00
            for (int i = 0; i < numberOfShowtimes; i++) {
                if (showtimeStart.isAfter(LocalTime.of(22, 0))) {
                    break;
                }

                Movie selectedMovie = movies.get(random.nextInt(movies.size()));
                // Calculate showtime end and round up to the nearest 5 minutes
                int durationWithInterval = selectedMovie.getDuration();  // Assuming getDuration() returns minutes
                LocalTime showtimeEnd = roundToNextFive(showtimeStart.plusMinutes(durationWithInterval));

                Showtime showtime = new Showtime();
                showtime.setMovie(selectedMovie);
                showtime.setAuditorium(auditorium);
                showtime.setDate(LocalDate.now());  // Or set a specific date
                showtime.setStartTime(showtimeStart.format(DateTimeFormatter.ofPattern("HH:mm")));
                showtime.setEndTime(showtimeEnd.format(DateTimeFormatter.ofPattern("HH:mm")));

                newShowtimes.add(showtime);

                // Next showtime starts when the previous one ends, rounded up
                showtimeStart = showtimeEnd.plusMinutes(30);
            }
        }

        showtimeRepository.saveAll(newShowtimes);
    }

    private LocalTime roundToNextFive(LocalTime time) {
        int minute = time.getMinute();
        int roundedMinute = (minute + 4) / 5 * 5;  // Round up to the nearest multiple of 5
        return time.withMinute(roundedMinute % 60).plusHours(roundedMinute / 60);  // Adjust hour if necessary
    }
}
