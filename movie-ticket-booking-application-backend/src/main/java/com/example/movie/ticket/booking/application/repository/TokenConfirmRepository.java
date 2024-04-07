package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.TokenConfirm;
import com.example.movie.ticket.booking.application.model.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TokenConfirmRepository extends JpaRepository<TokenConfirm, Integer> {
    Optional<TokenConfirm> findByTokenAndType(String token, TokenType tokenType);
}