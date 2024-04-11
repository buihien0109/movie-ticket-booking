package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.SeatReservation;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Integer> {
    boolean existsBySeat_IdAndShowtime_IdAndStatusIn(Integer seatId, Integer showtimeId, List<SeatReservationStatus> status);

    List<SeatReservation> findByStatusAndStartTimeBefore(SeatReservationStatus seatReservationStatus, LocalDateTime localDateTime);

    List<SeatReservation> findByShowtime_Id(Integer showtimeId);

    Optional<SeatReservation> findBySeat_IdAndShowtime_IdAndStatus(Integer seatId, Integer showtimeId, SeatReservationStatus seatReservationStatus);

    Optional<SeatReservation> findBySeat_IdAndShowtime_Id(Integer seatId, Integer showtimeId);
}