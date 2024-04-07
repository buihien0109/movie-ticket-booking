package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.GraphicsType;
import com.example.movie.ticket.booking.application.model.enums.TranslationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "showtimes")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    Movie movie;

    @ManyToOne
    @JoinColumn(name = "auditorium_id")
    Auditorium auditorium;

    @Enumerated(EnumType.STRING)
    GraphicsType graphicsType;

    @Enumerated(EnumType.STRING)
    TranslationType translationType;

    LocalDate date;
    String startTime;
    String endTime;

    Date createdAt;
    Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}
