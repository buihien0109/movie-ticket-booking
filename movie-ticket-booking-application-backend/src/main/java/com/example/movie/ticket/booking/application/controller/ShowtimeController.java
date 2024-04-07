package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertShowtimeRequest;
import com.example.movie.ticket.booking.application.service.ShowtimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/showtimes")
@RequiredArgsConstructor
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    @GetMapping
    public ResponseEntity<?> getAllShowtimes(@RequestParam(required = false) Integer cinemaId,
                                             @RequestParam(required = false) Integer auditoriumId,
                                             @RequestParam String showDate) {
        return ResponseEntity.ok(showtimeService.getAllShowTimes(cinemaId, auditoriumId, showDate));
    }

    @PostMapping
    public ResponseEntity<?> createShowtimes(@Valid @RequestBody UpsertShowtimeRequest request) {
        return ResponseEntity.ok(showtimeService.createShowtimes(request));
    }
}
