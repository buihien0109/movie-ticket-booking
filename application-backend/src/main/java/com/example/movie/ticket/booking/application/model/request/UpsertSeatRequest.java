package com.example.movie.ticket.booking.application.model.request;

import com.example.movie.ticket.booking.application.model.enums.SeatType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertSeatRequest {
    @NotNull(message = "Auditorium ID không được để trống")
    Integer auditoriumId;

    @NotNull(message = "Row index không được để trống")
    Integer rowIndex; // 1, 2, 3, ...

    @NotNull(message = "Column index không được để trống")
    Integer colIndex; // 1, 2, 3, ...

    @NotEmpty(message = "Code không được để trống")
    String code; // A1, A2, A3, ...

    @NotNull(message = "Type không được để trống")
    SeatType type; // NORMAL, VIP

    @NotNull(message = "Status không được để trống")
    Boolean status; // true: available, false: not available
}
