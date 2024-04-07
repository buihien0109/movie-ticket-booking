package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Integer> {
    boolean existsByName(String name);

    Optional<Country> findByName(String name);

    Optional<Country> findBySlug(String slug);
}