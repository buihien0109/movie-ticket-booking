package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.SeatType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "seats")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "auditorium_id")
    Auditorium auditorium;

    Integer rowIndex; // 1, 2, 3, ...
    Integer colIndex; // 1, 2, 3, ...
    String code; // A1, A2, A3, ...

    @Enumerated(EnumType.STRING)
    SeatType type; // NORMAL, VIP

    Boolean status; // true: available, false: not available

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
