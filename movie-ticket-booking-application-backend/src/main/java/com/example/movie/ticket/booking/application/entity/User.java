package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    @Column(unique = true)
    String email;

    String phone;

    @JsonIgnore
    @Column(nullable = false)
    String password;

    String avatar;

    @Enumerated(EnumType.STRING)
    UserRole role;

    Boolean enabled;

    Date createdAt;
    Date updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = new Date();
        updatedAt = createdAt;

        if (role == null) {
            role = UserRole.USER;
        }

        if (enabled == null) {
            enabled = false;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = new Date();
    }
}
