package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
}