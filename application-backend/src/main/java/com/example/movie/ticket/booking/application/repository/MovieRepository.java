package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    boolean existsByIdAndStatus(Integer id, Boolean status);

    Optional<Movie> findByIdAndSlugAndStatus(Integer id, String slug, boolean status);

    Page<Movie> findByStatus(boolean status, Pageable pageable);

    Page<Movie> findAll(Specification<Movie> spec, Pageable pageable);

    long countByGenres_Id(Integer genreId);

    long countByCountry_Id(Integer countryId);

    long countByActors_Id(Integer actorId);

    long countByDirectors_Id(Integer directorId);

    List<Movie> findByStatusOrderByCreatedAtDesc(Boolean status);
}