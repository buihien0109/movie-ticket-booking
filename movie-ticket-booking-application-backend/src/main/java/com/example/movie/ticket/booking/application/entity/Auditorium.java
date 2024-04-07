package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.AuditoriumType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "auditoriums")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Auditorium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    @Transient
    Integer totalSeats;

    Integer totalRows;
    Integer totalColumns;

    @Enumerated(EnumType.STRING)
    AuditoriumType type;

    @ManyToOne
    @JoinColumn(name = "cinema_id")
    Cinema cinema;

    Date createdAt;
    Date updatedAt;

    public Integer getTotalSeats() {
        return totalRows * totalColumns;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "auditorium", cascade = CascadeType.ALL)
    List<Seat> seats = new ArrayList<>();

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
