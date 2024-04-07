package com.example.movie.ticket.booking.application.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateProfileUserRequest {
    @NotEmpty(message = "Tên không được để trống")
    String name;

    @NotEmpty(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "(0[0-9]{9})", message = "Số điện thoại không đúng định dạng")
    String phone;
}
