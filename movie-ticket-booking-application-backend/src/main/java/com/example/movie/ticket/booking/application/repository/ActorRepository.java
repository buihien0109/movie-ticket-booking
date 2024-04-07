package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
    boolean existsByName(String name);

    Optional<Actor> findByName(String name);
}