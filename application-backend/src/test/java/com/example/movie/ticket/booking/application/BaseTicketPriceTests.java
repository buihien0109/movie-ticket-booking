package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.BaseTicketPrice;
import com.example.movie.ticket.booking.application.model.enums.*;
import com.example.movie.ticket.booking.application.repository.BaseTicketPriceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
public class BaseTicketPriceTests {
    @Autowired
    private BaseTicketPriceRepository baseTicketPriceRepository;

    @Test
    void save_prices() {
        int basePrice = 70000;
        Map<SeatType, Integer> seatTypeSurcharge = Map.of(
                SeatType.NORMAL, 0,
                SeatType.VIP, 20000,
                SeatType.COUPLE, 100000
        );
        Map<GraphicsType, Integer> graphicsTypeSurcharge = Map.of(
                GraphicsType._2D, 0,
                GraphicsType._3D, 20000
        );
        Map<ScreeningTimeType, Integer> screeningTimeTypeSurcharge = Map.of(
                ScreeningTimeType.SUAT_CHIEU_THEO_LICH, 0,
                ScreeningTimeType.SUAT_CHIEU_SOM, 30000
        );
        Map<DayType, Integer> dayTypeSurcharge = Map.of(
                DayType.WEEKDAY, 0,
                DayType.WEEKEND, 20000
        );
        Map<AuditoriumType, Integer> auditoriumTypeSurcharge = Map.of(
                AuditoriumType.STANDARD, 0,
                AuditoriumType.IMAX, 30000,
                AuditoriumType.GOLDCLASS, 200000
        );

        for (SeatType seatType : SeatType.values()) {
            for (GraphicsType graphicsType : GraphicsType.values()) {
                for (ScreeningTimeType screeningTimeType : ScreeningTimeType.values()) {
                    for (DayType dayType : DayType.values()) {
                        for (AuditoriumType auditoriumType : AuditoriumType.values()) {
                            // Check for invalid combinations
                            if ((auditoriumType == AuditoriumType.IMAX && seatType == SeatType.COUPLE) ||
                                    (auditoriumType == AuditoriumType.GOLDCLASS && (seatType == SeatType.VIP || seatType == SeatType.COUPLE))) {
                                continue;
                            }

                            int totalPrice = basePrice + seatTypeSurcharge.get(seatType) +
                                    graphicsTypeSurcharge.get(graphicsType) +
                                    screeningTimeTypeSurcharge.get(screeningTimeType) +
                                    dayTypeSurcharge.get(dayType) +
                                    auditoriumTypeSurcharge.get(auditoriumType);

                            BaseTicketPrice ticketPrice = new BaseTicketPrice();
                            ticketPrice.setSeatType(seatType);
                            ticketPrice.setGraphicsType(graphicsType);
                            ticketPrice.setScreeningTimeType(screeningTimeType);
                            ticketPrice.setDayType(dayType);
                            ticketPrice.setAuditoriumType(auditoriumType);
                            ticketPrice.setPrice(totalPrice);

                            baseTicketPriceRepository.save(ticketPrice);
                        }
                    }
                }
            }
        }
    }
}
