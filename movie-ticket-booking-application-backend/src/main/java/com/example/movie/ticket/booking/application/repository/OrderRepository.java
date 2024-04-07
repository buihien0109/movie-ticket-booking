package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Order;
import com.example.movie.ticket.booking.application.repository.custom.OrderRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer>, OrderRepositoryCustom {
    List<Order> findByUser_Id(Integer userId);
}