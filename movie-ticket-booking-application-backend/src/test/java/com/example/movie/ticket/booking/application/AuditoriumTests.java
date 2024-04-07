package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import com.example.movie.ticket.booking.application.entity.Cinema;
import com.example.movie.ticket.booking.application.repository.AuditoriumRepository;
import com.example.movie.ticket.booking.application.repository.CinemaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AuditoriumTests {

    @Autowired
    private CinemaRepository cinemaRepository;

    @Autowired
    private AuditoriumRepository auditoriumRepository;

    @Test
    void save_auditoriums() {
        // Each cinema has 3 -> 5 auditoriums
        List<Cinema> cinemas = cinemaRepository.findAll();
        cinemas.forEach(cinema -> {
            for (int i = 0; i < 3; i++) {
                auditoriumRepository.save(Auditorium.builder()
                        .name("Phòng " + (i + 1))
                        .totalSeats(200)
                        .cinema(cinema)
                        .build());
            }
        });
    }
}
