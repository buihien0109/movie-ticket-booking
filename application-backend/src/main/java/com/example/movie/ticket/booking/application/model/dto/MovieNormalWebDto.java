package com.example.movie.ticket.booking.application.model.dto;

import com.example.movie.ticket.booking.application.model.enums.MovieAge;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieNormalWebDto {
    Integer id;
    String name;
    String slug;
    String description;
    String poster;
    String trailer;
    MovieAge age;
    Double rating;
}
