package com.example.movie.ticket.booking.application.repository.custom.impl;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Order;
import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import com.example.movie.ticket.booking.application.repository.custom.OrderRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Repository
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MovieRevenueDto> findMovieRevenues(LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> orders = entityManager.createQuery("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate AND o.status = 'CONFIRMED'", Order.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        HashMap<Integer, MovieRevenueDto> movieRevenueMap = new HashMap<>();
        for (Order order : orders) {
            Integer movieId = order.getShowtime().getMovie().getId();
            String movieName = order.getShowtime().getMovie().getName();
            Integer ticketCount = order.getTicketItems().size();
            Integer totalRevenue = order.getTotalPrice();

            MovieRevenueDto movieRevenueDto = movieRevenueMap.get(movieId);
            if (movieRevenueDto == null) {
                movieRevenueDto = new MovieRevenueDto(movieId, movieName, ticketCount, totalRevenue);
                movieRevenueMap.put(movieId, movieRevenueDto);
            } else {
                movieRevenueDto.setTotalTickets(movieRevenueDto.getTotalTickets() + ticketCount);
                movieRevenueDto.setTotalRevenue(movieRevenueDto.getTotalRevenue() + totalRevenue);
            }
        }

        return new ArrayList<>(movieRevenueMap.values());
    }

    @Override
    public List<CinemaRevenueDto> findCinemaRevenues(LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> orders = entityManager.createQuery("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate AND o.status = 'CONFIRMED'", Order.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        HashMap<Integer, CinemaRevenueDto> cinemaRevenueMap = new HashMap<>();
        for (Order order : orders) {
            Integer cinemaId = order.getShowtime().getAuditorium().getCinema().getId();
            String cinemaName = order.getShowtime().getAuditorium().getCinema().getName();
            Integer ticketCount = order.getTicketItems().size();
            Integer totalRevenue = order.getTotalPrice();

            CinemaRevenueDto cinemaRevenueDto = cinemaRevenueMap.get(cinemaId);
            if (cinemaRevenueDto == null) {
                cinemaRevenueDto = new CinemaRevenueDto(cinemaId, cinemaName, ticketCount, totalRevenue);
                cinemaRevenueMap.put(cinemaId, cinemaRevenueDto);
            } else {
                cinemaRevenueDto.setTotalTickets(cinemaRevenueDto.getTotalTickets() + ticketCount);
                cinemaRevenueDto.setTotalRevenue(cinemaRevenueDto.getTotalRevenue() + totalRevenue);
            }
        }

        return new ArrayList<>(cinemaRevenueMap.values());
    }

}
