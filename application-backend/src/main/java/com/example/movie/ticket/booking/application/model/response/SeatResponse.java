package com.example.movie.ticket.booking.application.model.response;

import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.model.enums.SeatType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeatResponse {
    Integer id;
    Integer rowIndex;
    Integer colIndex;
    String code;
    SeatType type;
    Boolean status;
    SeatReservationStatus reservationStatus;
    Integer price;
}
