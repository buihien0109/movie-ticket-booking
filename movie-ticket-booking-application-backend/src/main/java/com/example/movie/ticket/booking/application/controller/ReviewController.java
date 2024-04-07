package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertReviewRequest;
import com.example.movie.ticket.booking.application.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/reviews")
    public ResponseEntity<?> createReview(@Valid @RequestBody UpsertReviewRequest request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<?> updateReview(@Valid @RequestBody UpsertReviewRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.updateReview(request, id));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/reviews/{id}")
    public ResponseEntity<?> adminUpdateReview(@Valid @RequestBody UpsertReviewRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.adminUpdateReview(request, id));
    }

    @DeleteMapping("/admin/reviews/{id}")
    public ResponseEntity<?> adminDeleteReview(@PathVariable Integer id) {
        reviewService.adminDeleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
