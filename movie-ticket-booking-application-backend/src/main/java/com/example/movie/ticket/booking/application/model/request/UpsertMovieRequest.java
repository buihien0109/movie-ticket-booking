package com.example.movie.ticket.booking.application.model.request;

import com.example.movie.ticket.booking.application.model.enums.GraphicsType;
import com.example.movie.ticket.booking.application.model.enums.MovieAge;
import com.example.movie.ticket.booking.application.model.enums.TranslationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertMovieRequest {
    String name;
    String nameEn;
    String trailer;
    String description;
    String poster;
    Integer releaseYear;
    Integer duration;
    Boolean status;
    Date showDate;
    MovieAge age;
    Integer countryId;
    List<Integer> genreIds;
    List<Integer> directorIds;
    List<Integer> actorIds;
    List<GraphicsType> graphics;
    List<TranslationType> translations;
}
