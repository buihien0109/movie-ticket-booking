package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
    boolean existsByName(String genre);

    Optional<Genre> findByName(String genre);

    Optional<Genre> findBySlug(String slug);
}