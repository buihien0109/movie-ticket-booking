package com.example.movie.ticket.booking.application.repository.custom;

import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderRepositoryCustom {
    List<MovieRevenueDto> findMovieRevenuesForCurrentMonth();

    List<CinemaRevenueDto> findCinemaRevenuesForCurrentMonth();
}
