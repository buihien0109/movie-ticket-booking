package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.Cinema;
import com.example.movie.ticket.booking.application.repository.CinemaRepository;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CinemaTests {

    @Autowired
    private CinemaRepository cinemaRepository;

    @Test
    void save_cinemas() {
        Faker faker = new Faker();
        // Create 5 cinema
        for (int i = 0; i < 5; i++) {
            cinemaRepository.save(Cinema.builder()
                    .name(faker.company().name())
                    .address(faker.address().fullAddress())
                    .mapLocation(faker.address().latitude() + "," + faker.address().longitude())
                    .build());
        }
    }
}
