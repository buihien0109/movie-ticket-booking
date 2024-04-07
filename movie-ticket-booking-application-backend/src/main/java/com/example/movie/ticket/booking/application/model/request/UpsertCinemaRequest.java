package com.example.movie.ticket.booking.application.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertCinemaRequest {
    @NotEmpty(message = "Tên rạp không được để trống")
    String name;

    @NotEmpty(message = "Địa chỉ không được để trống")
    String address;

    @NotEmpty(message = "Vị trí trên bản đồ không được để trống")
    String mapLocation;
}
