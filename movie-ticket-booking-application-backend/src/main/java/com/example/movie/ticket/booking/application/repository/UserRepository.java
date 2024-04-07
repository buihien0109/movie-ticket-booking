package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.model.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Page<User> findByOrderByCreatedAtDesc(Pageable pageable);
}