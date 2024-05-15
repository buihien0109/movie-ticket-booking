package com.example.movie.ticket.booking.application.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CinemaRevenueDto {
    Integer cinemaId;
    String cinemaName;
    Integer totalTickets;
    Integer totalRevenue;
}
