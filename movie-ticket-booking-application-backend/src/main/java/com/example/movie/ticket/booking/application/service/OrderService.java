package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Order;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.repository.OrderRepository;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUser_Id(userId);
    }

    public List<Order> getOrdersByCurrentUser() {
        User currentUser = SecurityUtils.getCurrentUserLogin();
        return orderRepository.findByUser_Id(currentUser.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Order getOrderById(Integer id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với id " + id));
    }
}
