package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.OrderServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderServiceItemRepository extends JpaRepository<OrderServiceItem, Integer> {
}