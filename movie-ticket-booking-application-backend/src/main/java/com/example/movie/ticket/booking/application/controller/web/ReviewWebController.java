package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.MovieService;
import com.example.movie.ticket.booking.application.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/reviews")
@RequiredArgsConstructor
public class ReviewWebController {
    private final ReviewService reviewService;
    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<?> getAllReviewsOfMovies(@RequestParam(required = false, defaultValue = "1") Integer page,
                                                   @RequestParam(required = false, defaultValue = "6") Integer limit) {
        return ResponseEntity.ok(movieService.getAllReviewsOfMovies(page, limit));
    }
}
