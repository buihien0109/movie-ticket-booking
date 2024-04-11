package com.example.movie.ticket.booking.application.repository.custom;

import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import com.example.movie.ticket.booking.application.model.dto.ReviewWebDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {
    Page<ReviewWebDto> findByMovie_Id(Integer movieId, Pageable pageable);
    Page<MovieReviewWebDto> getAllReviewsOfMovies(Pageable pageable);
}
