package com.example.movie.ticket.booking.application.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "additional_services")
public class AdditionalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;
    String description;
    Integer price;
    String thumbnail;

    Boolean status; // Trang thai hien thi

    Date createdAt;
    Date updatedAt;
    Date publishedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
        if (status) {
            publishedAt = new Date();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
        if (status) {
            publishedAt = new Date();
        } else {
            publishedAt = null;
        }
    }
}
