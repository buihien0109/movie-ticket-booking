package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.MovieService;
import com.example.movie.ticket.booking.application.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/public/movies")
@RequiredArgsConstructor
public class MovieWebController {
    private final MovieService blogWebService;
    private final ReviewService reviewService;

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam(required = false, defaultValue = "1") Integer page,
                                          @RequestParam(required = false, defaultValue = "20") Integer limit,
                                          @RequestParam(required = false) String genre,
                                          @RequestParam(required = false) String country,
                                          @RequestParam(required = false) Integer releaseYear,
                                          @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(blogWebService.searchMovies(page, limit, genre, country, releaseYear, keyword));
    }

    @GetMapping("/{id}/{slug}")
    public ResponseEntity<?> getMovieDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(blogWebService.getMovieDetail(id, slug));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<?> getAllReviewsByMovieId(@PathVariable Integer id,
                                                    @RequestParam(required = false, defaultValue = "1") Integer page,
                                                    @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(reviewService.getAllReviewsByMovieId(id, page, limit));
    }

    @GetMapping("/showing-now")
    public ResponseEntity<?> getShowingNowMovies() {
        return ResponseEntity.ok(blogWebService.getShowingNowMovies());
    }

    @GetMapping("/coming-soon")
    public ResponseEntity<?> getComingSoonMovies() {
        return ResponseEntity.ok(blogWebService.getComingSoonMovies());
    }
}
