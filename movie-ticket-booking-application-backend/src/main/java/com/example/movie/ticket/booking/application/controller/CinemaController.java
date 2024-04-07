package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertCinemaRequest;
import com.example.movie.ticket.booking.application.service.AuditoriumService;
import com.example.movie.ticket.booking.application.service.CinemaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/admin/cinemas")
@RequiredArgsConstructor
public class CinemaController {
    private final CinemaService cinemaService;
    private final AuditoriumService auditoriumService;

    @GetMapping
    public ResponseEntity<?> getAllCinemas() {
        return ResponseEntity.ok(cinemaService.getAllCinemas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCinemaById(@PathVariable Integer id) {
        return ResponseEntity.ok(cinemaService.getCinemaById(id));
    }

    @PostMapping
    public ResponseEntity<?> createCinema(@Valid @RequestBody UpsertCinemaRequest request) {
        return new ResponseEntity<>(cinemaService.saveCinema(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCinema(@PathVariable Integer id, @Valid @RequestBody UpsertCinemaRequest request) {
        return ResponseEntity.ok(cinemaService.updateCinema(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCinema(@PathVariable Integer id) {
        cinemaService.deleteCinema(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/auditoriums")
    public ResponseEntity<?> getAuditoriumsByCinema(@PathVariable Integer id) {
        return ResponseEntity.ok(auditoriumService.getAuditoriumsByCinema(id));
    }
}
