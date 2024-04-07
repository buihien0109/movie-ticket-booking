package com.example.movie.ticket.booking.application.model.response;

import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatReservationReponse {
    Integer seatId;
    Integer showtimeId;
    SeatReservationStatus status;
}
