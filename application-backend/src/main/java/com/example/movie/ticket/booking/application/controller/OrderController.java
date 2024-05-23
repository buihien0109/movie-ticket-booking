package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.entity.Order;
import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import com.example.movie.ticket.booking.application.model.request.CreateOrderRequest;
import com.example.movie.ticket.booking.application.model.response.PaymentResponse;
import com.example.movie.ticket.booking.application.service.MailService;
import com.example.movie.ticket.booking.application.service.OrderService;
import com.example.movie.ticket.booking.application.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final VNPayService vnPayService;
    private final MailService mailService;

    @Value("${app.frontend.host}")
    private String frontendHost;

    @Value("${app.frontend.port}")
    private String frontendPort;

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

            // TODO: Send mail confirm order
//            Order order = orderService.getOrderById(Integer.valueOf(orderInfo));
//            Map<String, Object> data = new HashMap<>();
//            data.put("order", order);
//            data.put("email", order.getUser().getEmail());
//            data.put("user", order.getUser());
//            data.put("serviceItems", order.getServiceItems());
//            data.put("ticketItems", order.getTicketItems());
//            mailService.sendMailConfirmOrder(data);
        } else {
            orderService.updateOrderStatus(Integer.valueOf(orderInfo), OrderStatus.CANCELLED);
        }

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header("Location", "%s:%s/thanh-toan-don-hang/%s".formatted(frontendHost, frontendPort, orderInfo))
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
