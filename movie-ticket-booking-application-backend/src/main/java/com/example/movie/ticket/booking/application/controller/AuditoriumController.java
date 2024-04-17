package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertAuditorium;
import com.example.movie.ticket.booking.application.service.AuditoriumService;
import com.example.movie.ticket.booking.application.service.SeatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class AuditoriumController {
    private final AuditoriumService auditoriumService;
    private final SeatService seatService;

    @GetMapping("/public/auditoriums/{auditoriumId}/showtimes/{showtimeId}/seats")
    ResponseEntity<?> getSeatsByAuditoriumAndShowtime(@PathVariable Integer auditoriumId,
                                                      @PathVariable Integer showtimeId) {
        return ResponseEntity.ok(seatService.getSeatsByAuditoriumAndShowtime(auditoriumId, showtimeId));
    }

    @GetMapping("/admin/auditoriums")
    public ResponseEntity<?> getAllAuditorium() {
        return ResponseEntity.ok(auditoriumService.getAllAuditorium());
    }

    @GetMapping("/admin/auditoriums/{id}")
    public ResponseEntity<?> getAuditoriumById(@PathVariable Integer id) {
        return ResponseEntity.ok(auditoriumService.getAuditoriumById(id));
    }

    @GetMapping("/admin/auditoriums/{id}/seats")
    public ResponseEntity<?> getSeatsByAuditorium(@PathVariable Integer id) {
        return ResponseEntity.ok(auditoriumService.getSeatsByAuditorium(id));
    }

    @PostMapping("/admin/auditoriums")
    public ResponseEntity<?> createAuditorium(@Valid @RequestBody UpsertAuditorium request) {
        return new ResponseEntity<>(auditoriumService.saveAuditorium(request), HttpStatus.CREATED);
    }

    @PutMapping("/admin/auditoriums/{id}")
    public ResponseEntity<?> updateAuditorium(@PathVariable Integer id, @Valid @RequestBody UpsertAuditorium request) {
        return ResponseEntity.ok(auditoriumService.updateAuditorium(id, request));
    }

    @DeleteMapping("/admin/auditoriums/{id}")
    public ResponseEntity<?> deleteAuditorium(@PathVariable Integer id) {
        auditoriumService.deleteAuditorium(id);
        return ResponseEntity.noContent().build();
    }
}
