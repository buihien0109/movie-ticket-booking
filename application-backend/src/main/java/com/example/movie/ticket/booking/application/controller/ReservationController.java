package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.SeatReservationRequest;
import com.example.movie.ticket.booking.application.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/seat-reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/book")
    public ResponseEntity<?> bookSeat(@Valid @RequestBody SeatReservationRequest request) {
        reservationService.reserveSeat(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelReservation(@Valid @RequestBody SeatReservationRequest request) {
        reservationService.cancelReservation(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
