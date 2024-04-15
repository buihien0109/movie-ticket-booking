package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Review;
import com.example.movie.ticket.booking.application.model.enums.GraphicsType;
import com.example.movie.ticket.booking.application.model.enums.TranslationType;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.repository.ReviewRepository;
import com.example.movie.ticket.booking.application.service.MovieService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Random;

@SpringBootTest
public class MovieTests {
    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Test
    void search_movie() {
        Page<Movie> movies = movieService.searchMovies(1, 20, "Hình sự", "Mỹ", 2023, null);
        System.out.println(movies.getTotalElements());

        movies.getContent().forEach(movie -> System.out.println(movie.getName()));
    }

    @Test
    void update_movies() {
        Random random = new Random();
        movieRepository.findAll().forEach(movie -> {
            boolean rd1 = random.nextInt(2) == 0;
            boolean rd2 = random.nextInt(2) == 0;

            if (rd1) {
                movie.setGraphics(List.of(GraphicsType._2D, GraphicsType._3D));
            } else {
                movie.setGraphics(List.of(GraphicsType._2D));
            }

            if (rd2) {
                movie.setTranslations(List.of(TranslationType.SUBTITLING, TranslationType.DUBBING));
            } else {
                movie.setTranslations(List.of(TranslationType.SUBTITLING));
            }

            movieRepository.save(movie);
        });
    }

    @Test
    void update_rating() {
        movieRepository.findAll().forEach(this::updateRatingOfMovie);
    }

    private void updateRatingOfMovie(Movie movie) {
        List<Review> reviews = reviewRepository.findByMovie_Id(movie.getId());
        double rating = reviews.stream().mapToDouble(Review::getRating).average().orElse(0);
        rating = Math.round(rating * 10) / 10.0;
        movie.setRating(rating);
        movieRepository.save(movie);
    }
}
