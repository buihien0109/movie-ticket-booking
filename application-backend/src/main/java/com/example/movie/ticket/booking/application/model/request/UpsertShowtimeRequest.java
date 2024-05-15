package com.example.movie.ticket.booking.application.model.request;

import com.example.movie.ticket.booking.application.model.enums.GraphicsType;
import com.example.movie.ticket.booking.application.model.enums.TranslationType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertShowtimeRequest {
    @NotNull(message = "ID phim không được để trống")
    Integer movieId;

    @NotNull(message = "ID phòng chiếu không được để trống")
    Integer auditoriumId;

    @NotNull(message = "Hình thức chiếu không được để trống")
    GraphicsType graphicsType;

    @NotNull(message = "Hình thức dịch không được để trống")
    TranslationType translationType;

    @NotNull(message = "Ngày không được để trống")
    LocalDate date;

    @NotEmpty(message = "Thời gian bắt đầu không được để trống")
    @NotNull(message = "Thời gian bắt đầu không được để trống")
    String startTime;

    @NotEmpty(message = "Thời gian kết thúc không được để trống")
    @NotNull(message = "Thời gian kết thúc không được để trống")
    String endTime;
}
