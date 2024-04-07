package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Review;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import com.example.movie.ticket.booking.application.model.dto.ReviewWebDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT new com.example.movie.ticket.booking.application.model.dto.ReviewWebDto(r.id, r.comment, r.rating, r.createdAt, r.updatedAt, " +
            "new com.example.movie.ticket.booking.application.model.dto.AuthorReviewDto(r.user.id, r.user.name, r.user.avatar)) AS rw " +
            "FROM Review r WHERE r.movie.id = :movieId ORDER BY r.createdAt DESC")
    Page<ReviewWebDto> findByMovie_Id(Integer movieId, Pageable pageable);

    // get all reviews of movies. Each movie has a list of reviews (2 elements in the list). Return a page of movies with their reviews
    @Query("""
                SELECT new com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto(
                    new com.example.movie.ticket.booking.application.model.dto.MovieNormalWebDto(m.id, m.name, m.slug, m.description, m.poster, m.trailer, m.age, m.rating),
                    (SELECT new com.example.movie.ticket.booking.application.model.dto.ReviewWebDto(r.id, r.comment, r.rating, r.createdAt, r.updatedAt, new com.example.movie.ticket.booking.application.model.dto.AuthorReviewDto(r.user.id, r.user.name, r.user.avatar)) FROM Review r WHERE r.movie.id = m.id ORDER BY r.createdAt DESC)
                ) FROM Movie m
            """)
    Page<MovieReviewWebDto> getAllReviewsOfMovies(Pageable pageable);
}