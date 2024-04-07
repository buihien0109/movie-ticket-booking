package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.AdditionalServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/additional-services")
@RequiredArgsConstructor
public class AdditionalServiceWebController {
    private final AdditionalServices additionalServices;

    @GetMapping
    public ResponseEntity<?> getAllAdditionalServicesByStatus() {
        return ResponseEntity.ok(additionalServices.getAllAdditionalServicesByStatus(true));
    }
}
