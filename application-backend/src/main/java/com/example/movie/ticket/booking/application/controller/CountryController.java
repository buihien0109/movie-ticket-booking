package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertCountryRequest;
import com.example.movie.ticket.booking.application.service.CountryService;
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
public class CountryController {
    private final CountryService countryService;

    @GetMapping("/public/countries")
    public ResponseEntity<?> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/admin/countries")
    public ResponseEntity<?> getAllCountriesByAdmin() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/admin/countries/{id}")
    public ResponseEntity<?> getCountryById(@PathVariable Integer id) {
        return ResponseEntity.ok(countryService.getCountryById(id));
    }

    @PostMapping("/admin/countries")
    public ResponseEntity<?> createCountry(@Valid @RequestBody UpsertCountryRequest request) {
        return new ResponseEntity<>(countryService.saveCountry(request), HttpStatus.CREATED);
    }

    @PutMapping("/admin/countries/{id}")
    public ResponseEntity<?> updateCountry(@PathVariable Integer id, @Valid @RequestBody UpsertCountryRequest request) {
        return ResponseEntity.ok(countryService.updateCountry(id, request));
    }

    @DeleteMapping("/admin/countries/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable Integer id) {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }
}
