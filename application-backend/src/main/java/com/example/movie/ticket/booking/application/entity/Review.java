package com.example.movie.ticket.booking.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id tự động tăng
    Integer id;

    @Column(columnDefinition = "TEXT")
    String comment;

    Integer rating;

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    List<String> feeling = new ArrayList<>();

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    List<String> images = new ArrayList<>();

    Date createdAt;
    Date updatedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist // Trước khi lưu dữ liệu vào database
    public void prePersist() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate // Trước khi cập nhật dữ liệu vào database
    public void preUpdate() {
        updatedAt = new Date();
    }
}
