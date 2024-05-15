package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.entity.BaseTicketPrice;
import com.example.movie.ticket.booking.application.model.request.UpsertBaseTicketPriceRequest;
import com.example.movie.ticket.booking.application.service.BaseTicketPriceService;
import com.example.movie.ticket.booking.application.service.BaseTicketPriceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/admin/base-ticket-prices")
@RequiredArgsConstructor
public class BaseTicketPriceController {
    private final BaseTicketPriceService baseTicketPriceService;

    @GetMapping
    public ResponseEntity<?> getAllBaseTicketPrices() {
        return ResponseEntity.ok(baseTicketPriceService.getAllBaseTicketPrices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBaseTicketPriceById(@PathVariable Integer id) {
        return ResponseEntity.ok(baseTicketPriceService.getBaseTicketPriceById(id));
    }

    @PostMapping
    public ResponseEntity<?> createBaseTicketPrice(@Valid @RequestBody UpsertBaseTicketPriceRequest request) {
        return new ResponseEntity<>(baseTicketPriceService.saveBaseTicketPrice(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBaseTicketPrice(@PathVariable Integer id, @Valid @RequestBody UpsertBaseTicketPriceRequest request) {
        return ResponseEntity.ok(baseTicketPriceService.updateBaseTicketPrice(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBaseTicketPrice(@PathVariable Integer id) {
        baseTicketPriceService.deleteBaseTicketPrice(id);
        return ResponseEntity.noContent().build();
    }
}
