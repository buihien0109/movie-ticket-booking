package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.GenreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/genres")
@RequiredArgsConstructor
public class GenreWebController {
    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<?> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }
}
