package com.example.movie.ticket.booking.application.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewWebDto {
    Integer id;
    String comment;
    Integer rating;
    List<String> feeling;
    Date createdAt;
    Date updatedAt;
    AuthorReviewDto user;
}