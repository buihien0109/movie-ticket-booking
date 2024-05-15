package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.*;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.model.request.CreateOrderRequest;
import com.example.movie.ticket.booking.application.model.response.ImageResponse;
import com.example.movie.ticket.booking.application.model.response.PaymentResponse;
import com.example.movie.ticket.booking.application.repository.*;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final SeatRepository seatRepository;
    private final AdditionalServiceRepository additionalServiceRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SeatReservationRepository seatReservationRepository;
    private final CouponRepository couponRepository;
    private final VNPayService vnpayService;
    private final ImageService imageService;
    private final QRCodeService qrCodeService;

    @Value("${app.backend.host}")
    private String backendHost;

    @Value("${app.backend.expose_port}")
    private String backendExposePort;

    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUser_IdOrderByCreatedAtDesc(userId);
    }

    public List<Order> getOrdersByCurrentUser() {
        User currentUser = SecurityUtils.getCurrentUserLogin();
        return orderRepository.findByUser_IdAndStatusOrderByCreatedAtDesc(currentUser.getId(), OrderStatus.CONFIRMED);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Order getOrderById(Integer id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với id " + id));
    }

    @Transactional
    public PaymentResponse createOrder(CreateOrderRequest request) {
        log.info("Creating order with request: {}", request);

        User currentUser = SecurityUtils.getCurrentUserLogin();
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy suất chiếu với id " + request.getShowtimeId()));

        // Kiểm tra mã giảm giá
        Coupon coupon = null;
        if (request.getCouponCode() != null) {
            coupon = couponRepository.findByCode(request.getCouponCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mã giảm giá " + request.getCouponCode()));

            // update used count
            coupon.setUsed(coupon.getUsed() + 1);
            couponRepository.save(coupon);
        }

        // Tạo đơn hàng
        Order order = Order.builder()
                .id(generateOrderId())
                .user(currentUser)
                .showtime(showtime)
                .status(OrderStatus.PENDING)
                .discount(coupon != null ? coupon.getDiscount() : null)
                .ticketItems(new ArrayList<>())
                .serviceItems(new ArrayList<>())
                .build();

        // Thêm các sản phẩm vào đơn hàng
        for (CreateOrderRequest.TicketItem ticketItem : request.getTicketItems()) {
            Seat seat = seatRepository.findById(ticketItem.getSeatId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ghế với id " + ticketItem.getSeatId()));
            OrderTicketItem orderTicketItem = OrderTicketItem.builder()
                    .seat(seat)
                    .price(ticketItem.getPrice())
                    .build();
            order.addTicketItem(orderTicketItem);
        }

        if (request.getServiceItems() != null) {
            for (CreateOrderRequest.ServiceItem serviceItem : request.getServiceItems()) {
                AdditionalService additionalService = additionalServiceRepository.findById(serviceItem.getAdditionalServiceId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dịch vụ thêm vào với id " + serviceItem.getAdditionalServiceId()));
                OrderServiceItem orderServiceItem = OrderServiceItem.builder()
                        .additionalService(additionalService)
                        .quantity(serviceItem.getQuantity())
                        .price(serviceItem.getPrice())
                        .build();
                order.addServiceItem(orderServiceItem);
            }
        }
        Order savedOrder = orderRepository.save(order);

        String returnUrl = "%s:%s/api/orders/vnpay-payment".formatted(backendHost, backendExposePort);
        log.info("Return URL: {}", returnUrl);
        log.info("Order ID: {}", savedOrder.getId());
        log.info("Start creating order with VNPay...");
        String paymentUrl = vnpayService.createOrder(
                savedOrder.getTotalPrice(),
                String.valueOf(savedOrder.getId()),
                returnUrl
        );
        log.info("Payment URL: {}", paymentUrl);
        return PaymentResponse.builder()
                .url(paymentUrl)
                .build();
    }

    public void updateOrderStatus(Integer orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với id " + orderId));
        order.setStatus(status);

        // Tạo mã QR code cho đơn hàng
        String qrCodeContent = String.valueOf(order.getId());
        byte[] qrCodeImage = qrCodeService.generateQRCodeImage(qrCodeContent, 200, 200);
        ImageResponse imageResponse = imageService.uploadImage(qrCodeImage);
        order.setQrCodePath(imageResponse.getUrl());
        orderRepository.save(order);

        // Tìm kiếm tất cả vé trong đơn hàng và cập nhật trạng thái của chúng
        Integer showtimeId = order.getShowtime().getId();
        List<OrderTicketItem> ticketItems = order.getTicketItems();

        for (OrderTicketItem ticketItem : ticketItems) {
            SeatReservation seatReservation = seatReservationRepository
                    .findBySeat_IdAndShowtime_Id(ticketItem.getSeat().getId(), showtimeId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy vé với id " + ticketItem.getSeat().getId()));
            seatReservation.setStatus(SeatReservationStatus.BOOKED);
            seatReservationRepository.save(seatReservation);
        }
    }

    // Generate order id has 8 digits
    private Integer generateOrderId() {
        Random random = new Random();
        return random.nextInt(90000000) + 10000000;
    }

    public Order GetOrderByIdByCustomer(Integer id) {
        User currentUser = SecurityUtils.getCurrentUserLogin();
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với id " + id));

        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Không tìm thấy đơn hàng với id " + id);
        }

        return order;
    }
}
