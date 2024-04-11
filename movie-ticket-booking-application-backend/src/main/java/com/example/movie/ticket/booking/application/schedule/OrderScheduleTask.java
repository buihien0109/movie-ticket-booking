package com.example.movie.ticket.booking.application.schedule;

import com.example.movie.ticket.booking.application.entity.Order;
import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import com.example.movie.ticket.booking.application.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderScheduleTask {
    private final OrderRepository orderRepository;

    // Phương thức này sẽ được gọi mỗi phút để kiểm tra và hủy đơn hàng quá hạn
     @Scheduled(fixedRate = 60000) // 60000 ms = 1 phút
    public void releaseExpiredOrders() {
         LocalDateTime now = LocalDateTime.now();

         // Tìm tất cả đơn hàng chưa thanh toán mà đã quá 10 phút
         List<Order> expiredOrders = orderRepository
                 .findByStatusAndCreatedAtBefore(OrderStatus.PENDING, now.minusMinutes(10));

         // Xóa đơn hàng quá hạn
         orderRepository.deleteAll(expiredOrders);
    }
}
