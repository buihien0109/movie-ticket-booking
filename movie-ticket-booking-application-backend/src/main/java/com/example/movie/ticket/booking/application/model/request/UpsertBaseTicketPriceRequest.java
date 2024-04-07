package com.example.movie.ticket.booking.application.model.request;

import com.example.movie.ticket.booking.application.model.enums.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertBaseTicketPriceRequest {
    @NotNull(message = "Loại ghế không được để trống")
    SeatType seatType;

    @NotNull(message = "Hình thức chiếu không được để trống")
    GraphicsType graphicsType;

    @NotNull(message = "Loại suất chiếu không được để trống")
    ScreeningTimeType screeningTimeType;

    @NotNull(message = "Loại ngày áp dụng giá vé không được để trống")
    DayType dayType;

    @NotNull(message = "Loại phòng chiếu không được để trống")
    AuditoriumType auditoriumType;

    @NotNull(message = "Giá vé không được để trống")
    Integer price;
}
