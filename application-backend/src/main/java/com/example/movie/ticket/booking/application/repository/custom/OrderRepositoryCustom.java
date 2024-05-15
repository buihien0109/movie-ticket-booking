package com.example.movie.ticket.booking.application.repository.custom;

import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import com.example.movie.ticket.booking.application.model.dto.RevenueDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepositoryCustom {
    List<MovieRevenueDto> findMovieRevenues(LocalDateTime startDate, LocalDateTime endDate);

    List<CinemaRevenueDto> findCinemaRevenues(LocalDateTime startDate, LocalDateTime endDate);

    List<RevenueDto> findMonthlyRevenue();
}
