package com.example.movie.ticket.booking.application.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewWebDto {
    Integer id;
    String comment;
    Integer rating;
    Date createdAt;
    Date updatedAt;
    AuthorReviewDto user;
}