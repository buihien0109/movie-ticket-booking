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
@RequestMapping("api")
@RequiredArgsConstructor
public class AdditionalServiceController {
    private final AdditionalServices additionalServices;

    @GetMapping("/public/additional-services")
    public ResponseEntity<?> getAllAdditionalServicesByStatus() {
        return ResponseEntity.ok(additionalServices.getAllAdditionalServicesByStatus(true));
    }

    @GetMapping("/admin/additional-services")
    public ResponseEntity<?> getAllAdditionalServices() {
        return ResponseEntity.ok(additionalServices.getAllAdditionalServices());
    }

    @GetMapping("/admin/additional-services/{id}")
    public ResponseEntity<?> getAdditionalServiceById(@PathVariable Integer id) {
        return ResponseEntity.ok(additionalServices.getAdditionalServiceById(id));
    }

    @PostMapping("/admin/additional-services")
    public ResponseEntity<?> createAdditionalService(@Valid @RequestBody UpsertAdditionalService request) {
        return new ResponseEntity<>(additionalServices.saveAdditionalService(request), HttpStatus.CREATED);
    }

    @PutMapping("/admin/additional-services/{id}")
    public ResponseEntity<?> updateAdditionalService(@PathVariable Integer id, @Valid @RequestBody UpsertAdditionalService request) {
        return ResponseEntity.ok(additionalServices.updateAdditionalService(id, request));
    }

    @DeleteMapping("/admin/additional-services/{id}")
    public ResponseEntity<?> deleteAdditionalService(@PathVariable Integer id) {
        additionalServices.deleteAdditionalService(id);
        return ResponseEntity.noContent().build();
    }
}
