package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Schedule;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.repository.ScheduleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootTest
public class ScheduleTests {
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private MovieRepository movieRepository;

    @Test
    void save_schedules() {
        Random rd = new Random();
        List<Movie> movies = movieRepository.findAll();
        List<Movie> showingMovies = new ArrayList<>();
        List<Movie> comingMovies = new ArrayList<>();

        // Random 10 movies showing now and 10 movies coming soon and movies are not duplicated
        for (int i = 0; i < 20; i++) {
            Movie movie = movies.get(rd.nextInt(movies.size()));
            if (i < 10) {
                if (!showingMovies.contains(movie)) {
                    showingMovies.add(movie);
                } else {
                    i--;
                }
            } else {
                if (!comingMovies.contains(movie)) {
                    comingMovies.add(movie);
                } else {
                    i--;
                }
            }
        }

        // Save schedules for showing movies
        Date now = new Date();
        for (Movie movie : showingMovies) {
            Date startDateShowing = new Date(now.getTime() - 1000L * 60 * 60 * 24 * (rd.nextInt(15 - 5 + 1) + 5));
            Date endDateShowing = new Date(startDateShowing.getTime() + 1000L * 60 * 60 * 24 * (rd.nextInt(45 - 30 + 1) + 30));
            scheduleRepository.save(Schedule.builder()
                    .movie(movie)
                    .startDate(startDateShowing)
                    .endDate(endDateShowing)
                    .build());
        }

        // Save schedules for coming movies
        for (Movie movie : comingMovies) {
            Date startDateComing = new Date(now.getTime() + 1000L * 60 * 60 * 24 * (rd.nextInt(100 - 10 + 1) + 10));
            Date endDateComing = new Date(startDateComing.getTime() + 1000L * 60 * 60 * 24 * (rd.nextInt(45 - 30 + 1) + 30));
            scheduleRepository.save(Schedule.builder()
                    .movie(movie)
                    .startDate(startDateComing)
                    .endDate(endDateComing)
                    .build());
        }
    }
}
