package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/showtimes")
@RequiredArgsConstructor
public class ShowtimeWebController {
    private final ShowtimeService showtimeService;

    @GetMapping("/cinemas")
    ResponseEntity<?> getAllShowtimesByCinema(@RequestParam Integer cinemaId, @RequestParam String showDate) {
        return ResponseEntity.ok(showtimeService.getAllShowtimesByCinema(cinemaId, showDate));
    }
}
