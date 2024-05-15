package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Seat;
import com.example.movie.ticket.booking.application.model.enums.SeatType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    List<Seat> findByAuditorium_Id(Integer auditoriumId);
    boolean existsByAuditorium_IdAndRowIndexAndColIndexAndCode(Integer auditoriumId, Integer rowIndex, Integer colIndex, String code);

    List<Seat> findByAuditorium_IdAndRowIndex(Integer auditoriumId, Integer rowIndex);

    void deleteByAuditorium_Id(Integer id);

    List<Seat> findByAuditorium_IdAndType(Integer id, SeatType type);
}