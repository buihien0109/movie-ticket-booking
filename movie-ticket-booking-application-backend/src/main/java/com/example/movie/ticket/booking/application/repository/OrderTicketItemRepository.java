package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.OrderTicketItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderTicketItemRepository extends JpaRepository<OrderTicketItem, Integer> {
}