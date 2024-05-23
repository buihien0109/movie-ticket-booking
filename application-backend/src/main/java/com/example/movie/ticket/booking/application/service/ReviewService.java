package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Movie;
import com.example.movie.ticket.booking.application.entity.Review;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertReviewRequest;
import com.example.movie.ticket.booking.application.model.response.ImageResponse;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.repository.ReviewRepository;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import com.example.movie.ticket.booking.application.utils.FileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;
    private final ImageService imageService;

    public Page<Review> getAllReviewsByMovieId(Integer movieId, Integer page, Integer limit) {
        log.info("Get all reviews by movie id = {}", movieId);
        if (!movieRepository.existsByIdAndStatus(movieId, true)) {
            throw new ResourceNotFoundException("Movie not found");
        }
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        return reviewRepository.findByMovie_Id(movieId, pageable);
    }

    @Transactional
    public Review createReview(UpsertReviewRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        Review review = Review.builder()
                .user(user)
                .comment(request.getComment())
                .rating(request.getRating())
                .feeling(request.getFeeling())
                .movie(movie)
                .build();
        reviewRepository.save(review);

        // update rating of movie
        updateRatingOfMovie(movie);

        return review;
    }

    @Transactional
    public Review createReview(UpsertReviewRequest request, List<MultipartFile> files) {
        User user = SecurityUtils.getCurrentUserLogin();

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phim có id = " + request.getMovieId()));

        List<String> images = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                ImageResponse imageResponse = imageService.uploadImage(file);
                images.add(imageResponse.getUrl());
            }
        }

        Review review = Review.builder()
                .user(user)
                .comment(request.getComment())
                .rating(request.getRating())
                .feeling(request.getFeeling())
                .images(images)
                .movie(movie)
                .build();
        reviewRepository.save(review);

        // update rating of movie
        updateRatingOfMovie(movie);

        return review;
    }

    private void updateRatingOfMovie(Movie movie) {
        List<Review> reviews = reviewRepository.findByMovie_Id(movie.getId());
        double rating = reviews.stream().mapToDouble(Review::getRating).average().orElse(0);
        rating = Math.round(rating * 10) / 10.0;
        movie.setRating(rating);
        movieRepository.save(movie);
    }

    @Transactional
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
        review.setFeeling(request.getFeeling());
        review.setMovie(movie);
        reviewRepository.save(review);

        // update rating of movie
        updateRatingOfMovie(movie);

        return review;
    }

    @Transactional
    public Review updateReview(UpsertReviewRequest request, List<MultipartFile> files, Integer id) {
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

        List<String> oldImages = review.getImages() == null ? new ArrayList<>() : review.getImages();
        List<String> images = request.getImages() == null ? new ArrayList<>() : request.getImages();

        // delete image in oldImages but not in images
        if (!oldImages.isEmpty()) {
            for (String oldImage : oldImages) {
                if (!images.contains(oldImage)) {
                    log.info("Delete image: {}", oldImage);
                    FileUtils.deleteFileByURL(oldImage);
                }
            }
        }

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                ImageResponse imageResponse = imageService.uploadImage(file);
                images.add(imageResponse.getUrl());
            }
        }

        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setFeeling(request.getFeeling());
        review.setImages(images);
        review.setMovie(movie);
        reviewRepository.save(review);

        // update rating of movie
        updateRatingOfMovie(movie);

        return review;
    }

    @Transactional
    public void deleteReview(Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bạn không có quyền xóa review này");
        }

        reviewRepository.delete(review);

        // update rating of movie
        updateRatingOfMovie(review.getMovie());

        // delete images
        if(review.getImages() != null && !review.getImages().isEmpty()) {
            for (String image : review.getImages()) {
                FileUtils.deleteFileByURL(image);
            }
        }
    }

    @Transactional
    public void adminDeleteReview(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy review có id = " + id));
        reviewRepository.delete(review);

        // update rating of movie
        updateRatingOfMovie(review.getMovie());
    }

    @Transactional
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

        reviewRepository.save(review);

        // update rating of movie
        updateRatingOfMovie(movie);

        return review;
    }
}
