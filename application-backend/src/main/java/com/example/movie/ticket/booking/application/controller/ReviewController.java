package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertReviewRequest;
import com.example.movie.ticket.booking.application.service.MovieService;
import com.example.movie.ticket.booking.application.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final MovieService movieService;

    @GetMapping("/public/reviews")
    public ResponseEntity<?> getAllReviewsOfMovies(@RequestParam(required = false, defaultValue = "1") Integer page,
                                                   @RequestParam(required = false, defaultValue = "6") Integer limit) {
        return ResponseEntity.ok(movieService.getAllReviewsOfMovies(page, limit));
    }

    @PostMapping("/reviews")
    public ResponseEntity<?> createReview(@Valid @ModelAttribute UpsertReviewRequest request,
                                          @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(reviewService.createReview(request, files));
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<?> updateReview(@Valid @ModelAttribute UpsertReviewRequest request,
                                          @RequestParam(value = "files", required = false) List<MultipartFile> files,
                                          @PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.updateReview(request, files, id));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/reviews/{id}")
    public ResponseEntity<?> adminUpdateReview(@Valid @RequestBody UpsertReviewRequest request,
                                               @PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.adminUpdateReview(request, id));
    }

    @DeleteMapping("/admin/reviews/{id}")
    public ResponseEntity<?> adminDeleteReview(@PathVariable Integer id) {
        reviewService.adminDeleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
