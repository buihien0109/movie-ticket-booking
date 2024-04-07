package com.example.movie.ticket.booking.application.repository.custom.impl;

import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import com.example.movie.ticket.booking.application.repository.custom.OrderRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepositoryImpl implements OrderRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<MovieRevenueDto> findMovieRevenuesForCurrentMonth() {
        String queryStr = "SELECT new com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto(m.id, m.name, COUNT(oti.id), SUM(oti.price)) " +
                "FROM Order o " +
                "JOIN o.showtime st " +
                "JOIN st.movie m " +
                "JOIN o.ticketItems oti " +
                "WHERE FUNCTION('YEAR', o.createdAt) = FUNCTION('YEAR', CURRENT_DATE) " +
                "AND FUNCTION('MONTH', o.createdAt) = FUNCTION('MONTH', CURRENT_DATE) " +
                "AND o.status = 'CONFIRMED' " +
                "GROUP BY m.id, m.name";

        return entityManager.createQuery(queryStr, MovieRevenueDto.class).getResultList();
    }

    @Override
    public List<CinemaRevenueDto> findCinemaRevenuesForCurrentMonth() {
        String queryStr = "SELECT new com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto(c.id, c.name, COUNT(oti.id), SUM(oti.price)) " +
                "FROM Order o " +
                "JOIN o.showtime st " +
                "JOIN st.auditorium a " +
                "JOIN a.cinema c " +
                "JOIN o.ticketItems oti " +
                "WHERE FUNCTION('YEAR', o.createdAt) = FUNCTION('YEAR', CURRENT_DATE) " +
                "AND FUNCTION('MONTH', o.createdAt) = FUNCTION('MONTH', CURRENT_DATE) " +
                "AND o.status = 'CONFIRMED' " +
                "GROUP BY c.id, c.name";

        return entityManager.createQuery(queryStr, CinemaRevenueDto.class).getResultList();
    }
}
