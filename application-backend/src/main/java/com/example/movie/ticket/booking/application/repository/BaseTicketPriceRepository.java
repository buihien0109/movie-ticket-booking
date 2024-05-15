package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.BaseTicketPrice;
import com.example.movie.ticket.booking.application.model.enums.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseTicketPriceRepository extends JpaRepository<BaseTicketPrice, Integer> {
    Optional<BaseTicketPrice> findBySeatTypeAndGraphicsTypeAndAuditoriumTypeAndScreeningTimeTypeAndDayType(SeatType seatType, GraphicsType graphicsType, AuditoriumType auditoriumType, ScreeningTimeType screeningTimeType, DayType dayType);
}