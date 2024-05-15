package com.example.movie.ticket.booking.application.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatReservationRequest {
    @NotNull(message = "Seat id không được để trống")
    Integer seatId;

    @NotNull(message = "Showtime id không được để trống")
    Integer showtimeId;
}
