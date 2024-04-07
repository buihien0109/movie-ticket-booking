package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Seat;
import com.example.movie.ticket.booking.application.entity.SeatReservation;
import com.example.movie.ticket.booking.application.entity.Showtime;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.model.request.SeatReservationRequest;
import com.example.movie.ticket.booking.application.model.response.SeatReservationReponse;
import com.example.movie.ticket.booking.application.repository.SeatRepository;
import com.example.movie.ticket.booking.application.repository.SeatReservationRepository;
import com.example.movie.ticket.booking.application.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {
    private final SeatReservationRepository seatReservationRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public void reserveSeat(SeatReservationRequest request) {
        // Giả định phương thức này kiểm tra sự tồn tại và khả dụng của ghế và suất chiếu
        // Nếu ghế không khả dụng, ném một ngoại lệ
        if (seatReservationRepository.existsBySeat_IdAndShowtime_IdAndStatusIn(
                request.getSeatId(), request.getShowtimeId(), List.of(SeatReservationStatus.HELD, SeatReservationStatus.BOOKED))) {
            throw new BadRequestException("Ghế đã được đặt hoặc giữ bởi người khác");
        }

        // Get the seat and showtime from the request
        Seat seat = seatRepository.findById(request.getSeatId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ghế"));

        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy suất chiếu"));

        SeatReservation reservation = SeatReservation.builder()
                .seat(seat)
                .showtime(showtime)
                .status(SeatReservationStatus.HELD)
                .startTime(LocalDateTime.now())
                .build();
        seatReservationRepository.save(reservation);

        SeatReservationReponse response = SeatReservationReponse.builder()
                .seatId(reservation.getSeat().getId())
                .showtimeId(reservation.getShowtime().getId())
                .status(reservation.getStatus())
                .build();
        messagingTemplate.convertAndSend("/topic/seatUpdate", response);
    }

    public void cancelReservation(SeatReservationRequest request) {
        SeatReservation reservation = seatReservationRepository.findBySeat_IdAndShowtime_IdAndStatus(request.getSeatId(), request.getShowtimeId(), SeatReservationStatus.HELD)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
        seatReservationRepository.delete(reservation);

        SeatReservationReponse response = SeatReservationReponse.builder()
                .seatId(request.getSeatId())
                .showtimeId(request.getShowtimeId())
                .status(null)
                .build();
        messagingTemplate.convertAndSend("/topic/seatUpdate", response);
    }
}
