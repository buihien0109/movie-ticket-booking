package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Director;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DirectorRepository extends JpaRepository<Director, Integer> {
    boolean existsByName(String name);

    Optional<Director> findByName(String name);
}