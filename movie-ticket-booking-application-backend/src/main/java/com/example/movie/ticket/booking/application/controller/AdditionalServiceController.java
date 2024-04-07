package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertAdditionalService;
import com.example.movie.ticket.booking.application.service.AdditionalServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/additional-services")
@RequiredArgsConstructor
public class AdditionalServiceController {
    private final AdditionalServices additionalServices;

    @GetMapping
    public ResponseEntity<?> getAllAdditionalServices() {
        return ResponseEntity.ok(additionalServices.getAllAdditionalServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdditionalServiceById(@PathVariable Integer id) {
        return ResponseEntity.ok(additionalServices.getAdditionalServiceById(id));
    }

    @PostMapping
    public ResponseEntity<?> createAdditionalService(@Valid @RequestBody UpsertAdditionalService request) {
        return new ResponseEntity<>(additionalServices.saveAdditionalService(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdditionalService(@PathVariable Integer id, @Valid @RequestBody UpsertAdditionalService request) {
        return ResponseEntity.ok(additionalServices.updateAdditionalService(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdditionalService(@PathVariable Integer id) {
        additionalServices.deleteAdditionalService(id);
        return ResponseEntity.noContent().build();
    }
}
