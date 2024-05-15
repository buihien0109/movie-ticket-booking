package com.example.movie.ticket.booking.application.specification;

import com.example.movie.ticket.booking.application.entity.Showtime;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ShowtimeSpecification {
    public static Specification<Showtime> filterShowtimes(Integer cinemaId, Integer auditoriumId, String showDate) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (cinemaId != null) {
                predicates.add(criteriaBuilder.equal(root.get("auditorium").get("cinema").get("id"), cinemaId));
            }
            if (auditoriumId != null) {
                predicates.add(criteriaBuilder.equal(root.get("auditorium").get("id"), auditoriumId));
            }
            if (showDate != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                LocalDate date = LocalDate.parse(showDate, formatter);
                predicates.add(criteriaBuilder.equal(root.get("date"), date));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
