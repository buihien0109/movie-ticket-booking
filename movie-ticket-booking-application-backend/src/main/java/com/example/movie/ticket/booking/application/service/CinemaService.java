package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Cinema;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertCinemaRequest;
import com.example.movie.ticket.booking.application.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll(Sort.by("id").descending());
    }

    public Cinema getCinemaById(Integer id) {
        return cinemaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim với id: " + id));
    }

    public Cinema saveCinema(UpsertCinemaRequest request) {
        Cinema cinema = Cinema.builder()
                .name(request.getName())
                .address(request.getAddress())
                .mapLocation(request.getMapLocation())
                .build();
        return cinemaRepository.save(cinema);
    }

    public Cinema updateCinema(Integer id, UpsertCinemaRequest request) {
        Cinema cinema = cinemaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim với id: " + id));

        cinema.setName(request.getName());
        cinema.setAddress(request.getAddress());
        cinema.setMapLocation(request.getMapLocation());
        return cinemaRepository.save(cinema);
    }

    public void deleteCinema(Integer id) {
        Cinema cinema = cinemaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim với id: " + id));
        cinemaRepository.delete(cinema);
    }
}
