package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import com.example.movie.ticket.booking.application.model.request.CreateOrderRequest;
import com.example.movie.ticket.booking.application.model.response.PaymentResponse;
import com.example.movie.ticket.booking.application.service.OrderService;
import com.example.movie.ticket.booking.application.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final VNPayService vnPayService;

    @GetMapping("/orders")
    public ResponseEntity<?> getOrdersByCurrentUser() {
        return ResponseEntity.ok(orderService.getOrdersByCurrentUser());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> GetOrderByIdByCustomer(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.GetOrderByIdByCustomer(id));
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request) {
        PaymentResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders/vnpay-payment")
    public ResponseEntity<?> GetMapping(HttpServletRequest request) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        if (paymentStatus == 1) {
            orderService.updateOrderStatus(Integer.valueOf(orderInfo), OrderStatus.CONFIRMED);
        } else {
            orderService.updateOrderStatus(Integer.valueOf(orderInfo), OrderStatus.CANCELLED);
        }

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header("Location", "http://127.0.0.1:5173/thanh-toan-don-hang/" + orderInfo)
                .build();
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/admin/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
}
