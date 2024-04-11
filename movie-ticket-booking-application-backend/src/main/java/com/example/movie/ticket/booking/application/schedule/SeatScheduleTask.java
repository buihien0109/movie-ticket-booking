package com.example.movie.ticket.booking.application.schedule;

import com.example.movie.ticket.booking.application.entity.SeatReservation;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.model.response.SeatReservationReponse;
import com.example.movie.ticket.booking.application.repository.SeatReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class SeatScheduleTask {
    private final SeatReservationRepository seatReservationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // Phương thức này sẽ được gọi mỗi phút để kiểm tra và hủy vé quá hạn
    @Scheduled(fixedRate = 60000) // 60000 ms = 1 phút
    public void releaseExpiredReservations() {
        LocalDateTime now = LocalDateTime.now();

        // Tìm tất cả vé được giữ (HELD) mà đã quá 10 phút
        List<SeatReservation> expiredReservations = seatReservationRepository
                .findByStatusAndStartTimeBefore(SeatReservationStatus.HELD, now.minusMinutes(10));

        // Duyệt qua từng vé quá hạn và cập nhật trạng thái của chúng
        for (SeatReservation reservation : expiredReservations) {
            SeatReservationReponse response = SeatReservationReponse.builder()
                    .seatId(reservation.getSeat().getId())
                    .showtimeId(reservation.getShowtime().getId())
                    .status(null)
                    .build();
            // Thông báo tới tất cả client thông qua WebSocket
            messagingTemplate.convertAndSend("/topic/seatUpdate", response);

            // Xóa vé quá hạn
            seatReservationRepository.delete(reservation);
        }
    }
}
