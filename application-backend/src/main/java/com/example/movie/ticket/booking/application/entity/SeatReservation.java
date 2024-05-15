package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "seat_reservations")
public class SeatReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    private Seat seat; // thông tin ghế

    @ManyToOne
    private Showtime showtime; // thông tin suất chiếu

    @Enumerated(EnumType.STRING)
    private SeatReservationStatus status; // HELD, BOOKED, CANCELLED

    private LocalDateTime startTime; // thời gian bắt đầu đặt ghế

    @PrePersist
    protected void onCreate() {
        startTime = LocalDateTime.now();
    }
}
