package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/public/countries")
@RequiredArgsConstructor
public class CountryWebController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<?> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
}
