package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/auditoriums")
@RequiredArgsConstructor
public class AuditoriumWebController {
    private final SeatService seatService;

    @GetMapping("/{auditoriumId}/showtimes/{showtimeId}/seats")
    ResponseEntity<?> getSeatsByAuditoriumAndShowtime(@PathVariable Integer auditoriumId, @PathVariable Integer showtimeId) {
        return ResponseEntity.ok(seatService.getSeatsByAuditoriumAndShowtime(auditoriumId, showtimeId));
    }
}
