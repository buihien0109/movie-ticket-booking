package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.BlogType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "blogs")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String title;
    String slug;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(columnDefinition = "MEDIUMTEXT")
    String content;

    String thumbnail;
    Boolean status;
    Integer viewCount;

    @Enumerated(EnumType.STRING)
    BlogType type;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    LocalDateTime publishedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    Set<ViewHistory> viewHistories = new LinkedHashSet<>();

    @PrePersist
    public void prePersist() {
        viewCount = 0;
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status) {
            publishedAt = LocalDateTime.now();
        } else {
            publishedAt = null;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
        if (status) {
            publishedAt = LocalDateTime.now();
        } else {
            publishedAt = null;
        }
    }

    public void addViewHistory(ViewHistory viewHistory) {
        viewHistories.add(viewHistory);
        viewHistory.setBlog(this);
    }

    public void removeViewHistory(ViewHistory viewHistory) {
        viewHistories.remove(viewHistory);
        viewHistory.setBlog(null);
    }
}