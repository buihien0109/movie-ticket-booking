package com.example.movie.ticket.booking.application.model.dto;

import com.example.movie.ticket.booking.application.model.enums.UserRole;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDto {
    Integer id;
    String name;
    String email;
    String phone;
    String avatar;
    UserRole role;
}
