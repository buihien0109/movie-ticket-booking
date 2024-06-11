package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Showtime;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findAll(Specification<Showtime> showtimeSpecification, Sort sort);

    List<Showtime> findByAuditorium_Cinema_IdAndDateBetween(Integer id, LocalDate startDate, LocalDate endDate);

    List<Showtime> findByMovie_Id(Integer movieId);

    List<Showtime> findByAuditorium_IdAndDate(Integer id, LocalDate date);

    List<Showtime> findByAuditorium_Cinema_IdAndDate(Integer cinemaId, LocalDate showDate);

    List<Showtime> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Showtime> findByMovie_IdAndDate(Integer id, LocalDate date);

    boolean existsByMovie_Id(Integer id);

    boolean existsByMovie_IdAndDateBetween(Integer id, LocalDate currentDate, LocalDate endDate);
}