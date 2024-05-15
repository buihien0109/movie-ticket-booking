package com.example.movie.ticket.booking.application.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieRevenueDto {
    Integer movieId;
    String movieName;
    Integer totalTickets;
    Integer totalRevenue;
}
