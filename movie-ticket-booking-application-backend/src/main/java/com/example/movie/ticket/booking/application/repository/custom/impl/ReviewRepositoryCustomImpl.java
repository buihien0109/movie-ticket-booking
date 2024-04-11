package com.example.movie.ticket.booking.application.repository.custom.impl;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.model.dto.MovieNormalWebDto;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import com.example.movie.ticket.booking.application.model.dto.ReviewWebDto;
import com.example.movie.ticket.booking.application.repository.custom.ReviewRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ReviewWebDto> findByMovie_Id(Integer movieId, Pageable pageable) {
        String query = "SELECT new com.example.movie.ticket.booking.application.model.dto.ReviewWebDto(r.id, r.comment, r.rating, r.feeling, r.createdAt, r.updatedAt, " +
                "new com.example.movie.ticket.booking.application.model.dto.AuthorReviewDto(r.user.id, r.user.name, r.user.avatar)) " +
                "FROM Review r WHERE r.movie.id = :movieId ORDER BY r.createdAt DESC";

        List<ReviewWebDto> reviews = entityManager.createQuery(query, ReviewWebDto.class)
                .setParameter("movieId", movieId)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        return new PageImpl<>(reviews, pageable, reviews.size());
    }

    @Override
    public Page<MovieReviewWebDto> getAllReviewsOfMovies(Pageable pageable) {
        // Implementing this method would be more complex due to the structure of the query.
        // You may need to fetch movies first and then fetch reviews for each movie separately.
        // For simplicity, this example will not implement the full logic but will outline the approach.

        String movieQuery = "SELECT m FROM Movie m";
        List<Movie> movies = entityManager.createQuery(movieQuery, Movie.class)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // For each movie, now fetch the reviews. This part needs optimization for a real application.
        // Below is just a simple and not optimized way to fetch reviews for each movie.
        List<MovieReviewWebDto> movieReviews = new ArrayList<>();
        for (Movie movie : movies) {
            String reviewQuery = "SELECT new com.example.movie.ticket.booking.application.model.dto.ReviewWebDto(r.id, r.comment, r.rating, r.feeling, r.createdAt, r.updatedAt, " +
                    "new com.example.movie.ticket.booking.application.model.dto.AuthorReviewDto(r.user.id, r.user.name, r.user.avatar)) " +
                    "FROM Review r WHERE r.movie.id = :movieId ORDER BY r.createdAt DESC";

            List<ReviewWebDto> reviews = entityManager.createQuery(reviewQuery, ReviewWebDto.class)
                    .setParameter("movieId", movie.getId())
                    .setMaxResults(2) // Assuming you want the top 2 reviews
                    .getResultList();

            MovieReviewWebDto dto = new MovieReviewWebDto(new MovieNormalWebDto(movie.getId(), movie.getName(), movie.getSlug(), movie.getDescription(), movie.getPoster(), movie.getTrailer(), movie.getAge(), movie.getRating()), reviews);
            movieReviews.add(dto);
        }

        return new PageImpl<>(movieReviews, pageable, movieReviews.size());
    }
}
