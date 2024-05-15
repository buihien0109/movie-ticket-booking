package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditoriumRepository extends JpaRepository<Auditorium, Integer> {
    List<Auditorium> findByCinema_Id(Integer cinemaId);

    List<Auditorium> findByCinemaId(Integer cinemaId);
}