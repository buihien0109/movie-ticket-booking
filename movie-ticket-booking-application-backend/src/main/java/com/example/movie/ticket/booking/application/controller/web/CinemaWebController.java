package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.CinemaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/cinemas")
@RequiredArgsConstructor
public class CinemaWebController {
    private final CinemaService cinemaService;

    @GetMapping
    public ResponseEntity<?> getAllCinemas() {
        return ResponseEntity.ok(cinemaService.getAllCinemas());
    }
}
