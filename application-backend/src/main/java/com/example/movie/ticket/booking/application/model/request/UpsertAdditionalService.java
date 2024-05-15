package com.example.movie.ticket.booking.application.model.request;

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
public class UpsertAdditionalService {
    @NotEmpty(message = "Tên dịch vụ không được để trống")
    String name;

    @NotEmpty(message = "Mô tả không được để trống")
    String description;

    @NotNull(message = "Giá không được để trống")
    Integer price;

    @NotNull(message = "Trạng thái không được để trống")
    Boolean status;

    String thumbnail;
}
