package com.example.movie.ticket.booking.application.entity;

import com.example.movie.ticket.booking.application.model.enums.GraphicsType;
import com.example.movie.ticket.booking.application.model.enums.MovieAge;
import com.example.movie.ticket.booking.application.model.enums.TranslationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;
import io.hypersistence.utils.hibernate.type.json.JsonType;

import java.util.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "movies")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name; // tên phim
    String nameEn; // tên phim tiếng anh
    String slug; // tên không dấu
    String trailer; // link trailer

    @Column(columnDefinition = "TEXT")
    String description; // mô tả

    String poster; // ảnh poster
    Integer releaseYear; // năm phát hành
    Double rating; // đánh giá
    Integer duration; // thời lượng
    Boolean status; // trạng thái
    Date showDate; // ngày chiếu
    Date createdAt; // ngày tạo
    Date updatedAt; // ngày cập nhật
    Date publishedAt; // ngày xuất bản

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    List<GraphicsType> graphics = new ArrayList<>(); // hình thức chiếu

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    List<TranslationType> translations = new ArrayList<>(); // hình thức dịch

    @Enumerated(EnumType.STRING)
    MovieAge age; // độ tuổi

    @ManyToOne
    @JoinColumn(name = "country_id")
    Country country;

    @ManyToMany
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    @Fetch(FetchMode.SUBSELECT)
    Set<Genre> genres = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "movie_director",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "director_id"))
    @Fetch(FetchMode.SUBSELECT)
    Set<Director> directors = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "movie_actor",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id"))
    @Fetch(FetchMode.SUBSELECT)
    Set<Actor> actors = new LinkedHashSet<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    Set<Review> reviews = new LinkedHashSet<>();


    @PrePersist
    public void prePersist() {
        createdAt = new Date();
        updatedAt = new Date();

        if (status) {
            publishedAt = new Date();
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = new Date();
        if (status) {
            publishedAt = new Date();
        } else {
            publishedAt = null;
        }
    }
}
