package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Seat;
import com.example.movie.ticket.booking.application.entity.SeatReservation;
import com.example.movie.ticket.booking.application.entity.Showtime;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.repository.SeatRepository;
import com.example.movie.ticket.booking.application.repository.SeatReservationRepository;
import com.example.movie.ticket.booking.application.repository.ShowtimeRepository;
import com.example.movie.ticket.booking.application.service.ShowtimeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@SpringBootTest
public class SeatReservationTests {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private SeatReservationRepository seatReservationRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowtimeService showtimeService;

    @Test
    void save_seat_reservation() {
        Random random = new Random();
        List<Showtime> showtimes = showtimeService.getAllShowtimesByCinema(1, "03/04/2024");
        for (Showtime showtime : showtimes) {
            // Lấy danh sách ghế của mỗi suất chiếu
            List<Seat> seats = seatRepository.findByAuditorium_Id(showtime.getAuditorium().getId());

            // Random 5 ghế
            for (int i = 0; i < 5; i++) {
                int randomIndex = random.nextInt(seats.size());
                Seat seat = seats.get(randomIndex);

                SeatReservation seatReservation = SeatReservation.builder()
                        .seat(seat)
                        .showtime(showtime)
                        .status(SeatReservationStatus.BOOKED)
                        .startTime(LocalDateTime.now())
                        .build();
                seatReservationRepository.save(seatReservation);
            }
        }
    }
}
