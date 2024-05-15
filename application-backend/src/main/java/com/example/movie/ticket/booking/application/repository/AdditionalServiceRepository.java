package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.AdditionalService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Integer> {
    List<AdditionalService> findByStatus(Boolean status);
}