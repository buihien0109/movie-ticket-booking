package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Review;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.dto.MovieReviewWebDto;
import com.example.movie.ticket.booking.application.model.dto.ReviewWebDto;
import com.example.movie.ticket.booking.application.model.request.UpsertReviewRequest;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.repository.ReviewRepository;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;

    public Page<ReviewWebDto> getAllReviewsByMovieId(Integer movieId, Integer page, Integer limit) {
        log.info("Get all reviews by movie id = {}", movieId);
        if (!movieRepository.existsByIdAndStatus(movieId, true)) {
            throw new ResourceNotFoundException("Movie not found");
        }
        Pageable pageable = PageRequest.of(page - 1, limit);
        return reviewRepository.findByMovie_Id(movieId, pageable);
    }

    public Page<MovieReviewWebDto> getAllReviewsOfMovies(Integer page, Integer limit) {
        log.info("Get all reviews of movies");
        Pageable pageable = PageRequest.of(page - 1, limit);
        return reviewRepository.getAllReviewsOfMovies(pageable);
    }

    public Review createReview(UpsertReviewRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        Review review = Review.builder()
                .user(user)
                .comment(request.getComment())
                .rating(request.getRating())
                .movie(movie)
                .build();
        return reviewRepository.save(review);
    }

    public Review updateReview(UpsertReviewRequest request, Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));

        // check user is owner of review
        if (!review.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bạn không có quyền sửa review này");
        }

        // check review is for movie
        if (!review.getMovie().getId().equals(movie.getId())) {
            throw new BadRequestException("Review không thuộc phim này");
        }

        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setMovie(movie);

        return reviewRepository.save(review);
    }

    public void deleteReview(Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bạn không có quyền xóa review này");
        }

        reviewRepository.delete(review);
    }

    public void adminDeleteReview(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));
        reviewRepository.delete(review);
    }

    public Review adminUpdateReview(UpsertReviewRequest request, Integer id) {
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));

        // check review is for movie
        if (!review.getMovie().getId().equals(movie.getId())) {
            throw new BadRequestException("Review không thuộc phim này");
        }

        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setMovie(movie);

        return reviewRepository.save(review);
    }
}
