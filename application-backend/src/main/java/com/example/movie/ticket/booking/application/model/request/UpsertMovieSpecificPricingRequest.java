package com.example.movie.ticket.booking.application.model.request;

import com.example.movie.ticket.booking.application.model.enums.DayType;
import com.example.movie.ticket.booking.application.model.enums.ProjectionType;
import com.example.movie.ticket.booking.application.model.enums.ScreeningTimeType;
import com.example.movie.ticket.booking.application.model.enums.SeatType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertMovieSpecificPricingRequest {
    @NotNull(message = "ID phim không được để trống")
    Integer movieId;

    @NotNull(message = "Loại ghế không được để trống")
    SeatType seatType;

    @NotNull(message = "Hình thức chiếu không được để trống")
    ProjectionType projectionType;

    @NotNull(message = "Loại suất chiếu không được để trống")
    ScreeningTimeType screeningTimeType;

    @NotNull(message = "Giá vé không được để trống")
    Integer price;

    @NotNull(message = "Loại ngày áp dụng giá vé không được để trống")
    DayType dayType;
}
