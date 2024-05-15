package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.*;
import com.example.movie.ticket.booking.application.model.enums.DayType;
import com.example.movie.ticket.booking.application.model.enums.OrderStatus;
import com.example.movie.ticket.booking.application.model.enums.ScreeningTimeType;
import com.example.movie.ticket.booking.application.model.enums.SeatReservationStatus;
import com.example.movie.ticket.booking.application.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@SpringBootTest
public class OrderTests {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderTicketItemRepository orderTicketItemRepository;

    @Autowired
    private OrderServiceItemRepository orderServiceItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdditionalServiceRepository additionalServiceRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private AuditoriumRepository auditoriumRepository;

    @Autowired
    private BaseTicketPriceRepository baseTicketPriceRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private SeatReservationRepository seatReservationRepository;

    @Test
    void save_orders() {
        Random random = new Random();
        List<User> users = userRepository.findAll();
        List<AdditionalService> additionalServices = additionalServiceRepository.findAll();
        List<Showtime> showtimes = showtimeRepository.findByDateBetween(LocalDate.now().plusDays(1), LocalDate.now().plusDays(10));
        List<BaseTicketPrice> baseTicketPrices = baseTicketPriceRepository.findAll();

        // Each user create 5 orders
        for (User user : users) {
            for (int i = 0; i < random.nextInt(4) + 1; i++) {
                Showtime rdShowtime = showtimes.get(random.nextInt(showtimes.size()));
                Order newOrder = Order.builder()
                        .id(generateOrderId())
                        .user(user)
                        .showtime(rdShowtime)
                        .status(OrderStatus.CONFIRMED)
                        .build();
                orderRepository.save(newOrder);

                // Create 2 order service item
                for (int j = 0; j < random.nextInt(2) + 1; j++) {
                    AdditionalService rdAdditionalService = additionalServices.get(random.nextInt(additionalServices.size()));
                    OrderServiceItem newOrderServiceItem = OrderServiceItem.builder()
                            .additionalService(rdAdditionalService)
                            .quantity(random.nextInt(2) + 1)
                            .price(rdAdditionalService.getPrice())
                            .order(newOrder)
                            .build();
                    orderServiceItemRepository.save(newOrderServiceItem);
                }

                DayType dayType = rdShowtime.getDate().getDayOfWeek().getValue() < 6 ? DayType.WEEKDAY : DayType.WEEKEND;
                List<Seat> seats = seatRepository.findByAuditorium_Id(rdShowtime.getAuditorium().getId());
                for (int j = 0; j < random.nextInt(3) + 1; j++) {
                    Seat seat = seats.get(random.nextInt(seats.size()));

                    // Check if the seat is already reserved
                    Optional<SeatReservation> optionalSeatReservation = seatReservationRepository.findBySeat_IdAndShowtime_Id(seat.getId(), rdShowtime.getId());
                    if (optionalSeatReservation.isPresent()) {
                        continue;
                    }

                    Optional<BaseTicketPrice> matchedPrice = baseTicketPrices.stream().filter(price ->
                            price.getSeatType() == seat.getType() &&
                                    price.getGraphicsType() == rdShowtime.getGraphicsType() &&
                                    price.getScreeningTimeType() == ScreeningTimeType.SUAT_CHIEU_THEO_LICH &&
                                    price.getDayType() == dayType &&
                                    price.getAuditoriumType() == rdShowtime.getAuditorium().getType()
                    ).findFirst();

                    OrderTicketItem newOrderTicketItem = OrderTicketItem.builder()
                            .seat(seat)
                            .price(matchedPrice.map(BaseTicketPrice::getPrice).orElse(70000))
                            .order(newOrder)
                            .build();
                    orderTicketItemRepository.save(newOrderTicketItem);

                    // Reserve seat
                    SeatReservation seatReservation = SeatReservation.builder()
                            .seat(seat)
                            .showtime(rdShowtime)
                            .status(SeatReservationStatus.BOOKED)
                            .build();
                    seatReservationRepository.save(seatReservation);
                }
            }
        }
    }

    // Generate order id has 8 digits
    private Integer generateOrderId() {
        Random random = new Random();
        return random.nextInt(90000000) + 10000000;
    }
}
