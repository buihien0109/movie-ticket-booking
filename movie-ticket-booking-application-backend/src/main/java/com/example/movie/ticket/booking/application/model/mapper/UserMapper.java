package com.example.movie.ticket.booking.application.model.mapper;

import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper modelMapper;

    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
