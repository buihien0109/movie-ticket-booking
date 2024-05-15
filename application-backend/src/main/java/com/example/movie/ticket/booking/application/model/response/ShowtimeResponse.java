package com.example.movie.ticket.booking.application.model.response;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import com.example.movie.ticket.booking.application.entity.Cinema;
import com.example.movie.ticket.booking.application.entity.Showtime;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShowtimeResponse {
    Cinema cinema;
    List<AuditoriumResponse> auditoriums;

    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class AuditoriumResponse {
        Auditorium auditorium;
        List<Showtime> showtimes;
    }
}
