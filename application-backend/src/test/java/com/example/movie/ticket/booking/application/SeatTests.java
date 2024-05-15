package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import com.example.movie.ticket.booking.application.entity.Seat;
import com.example.movie.ticket.booking.application.model.enums.SeatType;
import com.example.movie.ticket.booking.application.repository.AuditoriumRepository;
import com.example.movie.ticket.booking.application.repository.SeatRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SeatTests {
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private AuditoriumRepository auditoriumRepository;


    @Test
    void save_seats() {
        // Each auditorium has 10 rows begin from A to J and 15 columns begin from 1 to 15
        // Each row has 15 seats
        // Each auditorium has 150 seats
        // Rows: A, B, C, D, E, F, G, H, I, J
        // Columns: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
        // Rows: A, B, C, D is for NORMAL seats. Rows: E, F, G, H, I, J is for VIP seats
        List<Auditorium> auditoriums = auditoriumRepository.findAll();
        auditoriums.forEach(auditorium -> {
            for (int i = 0; i < 10; i++) {
                for (int j = 0; j < 15; j++) {
                    seatRepository.save(Seat.builder()
                            .auditorium(auditorium)
                            .rowIndex(i + 1)
                            .colIndex(j + 1)
                            .type(i < 4 ? SeatType.NORMAL : SeatType.VIP)
                            .build());
                }
            }
        });
    }
}
