package com.example.movie.ticket.booking.application.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertScheduleRequest {
    @NotNull(message = "Movie id không được để trống")
    Integer movieId;

    @NotNull(message = "Start date không được để trống")
    Date startDate;

    @NotNull(message = "End date không được để trống")
    Date endDate;
}
