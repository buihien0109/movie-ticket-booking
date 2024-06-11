package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertMovieRequest;
import com.example.movie.ticket.booking.application.service.MovieService;
import com.example.movie.ticket.booking.application.service.ReviewService;
import com.example.movie.ticket.booking.application.service.ShowtimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final ReviewService reviewService;
    private final ShowtimeService showtimeService;

    @GetMapping("/public/movies/search")
    public ResponseEntity<?> searchMovies(@RequestParam(required = false, defaultValue = "1") Integer page,
                                          @RequestParam(required = false, defaultValue = "20") Integer limit,
                                          @RequestParam(required = false) String genre,
                                          @RequestParam(required = false) String country,
                                          @RequestParam(required = false) Integer releaseYear,
                                          @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(movieService.searchMovies(page, limit, genre, country, releaseYear, keyword));
    }

    @GetMapping("/public/movies/{id}/{slug}")
    public ResponseEntity<?> getMovieDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(movieService.getMovieDetail(id, slug));
    }

    @GetMapping("/public/movies/{id}/reviews")
    public ResponseEntity<?> getAllReviewsByMovieId(@PathVariable Integer id,
                                                    @RequestParam(required = false, defaultValue = "1") Integer page,
                                                    @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(reviewService.getAllReviewsByMovieId(id, page, limit));
    }

    @GetMapping("/public/movies/showing-now")
    public ResponseEntity<?> getShowingNowMovies() {
        return ResponseEntity.ok(movieService.getShowingNowMovies());
    }

    @GetMapping("/public/movies/coming-soon")
    public ResponseEntity<?> getComingSoonMovies() {
        return ResponseEntity.ok(movieService.getComingSoonMovies());
    }

    @GetMapping("/public/movies/{id}/showtimes")
    public ResponseEntity<?> getShowtimesByMovie(@PathVariable Integer id, @RequestParam String showDate) {
        return ResponseEntity.ok(showtimeService.getShowtimesByMovie(id, showDate));
    }

    @GetMapping("/public/movies/{id}/has-showtimes")
    public ResponseEntity<?> checkMovieHasShowtimes(@PathVariable Integer id) {
        return ResponseEntity.ok(showtimeService.checkMovieHasShowtimes(id));
    }

    @GetMapping("/admin/movies")
    public ResponseEntity<?> getAllMovies(@RequestParam(required = false) Boolean status) {
        return ResponseEntity.ok(movieService.getAllMovies(status));
    }

    @GetMapping("/admin/movies/in-schedule")
    public ResponseEntity<?> getAllMoviesInSchedule(@RequestParam String date) {
        return ResponseEntity.ok(movieService.getAllMoviesInSchedule(date));
    }

    @GetMapping("/admin/movies/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Integer id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PostMapping("/admin/movies")
    public ResponseEntity<?> createMovie(@Valid @RequestBody UpsertMovieRequest request) {
        return new ResponseEntity<>(movieService.saveMovie(request), HttpStatus.CREATED);
    }

    @PutMapping("/admin/movies/{id}")
    public ResponseEntity<?> updateMovie(@PathVariable Integer id, @Valid @RequestBody UpsertMovieRequest request) {
        return ResponseEntity.ok(movieService.updateMovie(id, request));
    }

    @DeleteMapping("/admin/movies/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
