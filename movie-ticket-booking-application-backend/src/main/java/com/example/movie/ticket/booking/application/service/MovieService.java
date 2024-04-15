package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.*;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertMovieRequest;
import com.example.movie.ticket.booking.application.repository.*;
import com.example.movie.ticket.booking.application.specification.MovieSpecification;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final ScheduleRepository scheduleRepository;
    private final GenreRepository genreRepository;
    private final DirectorRepository directorRepository;
    private final ActorRepository actorRepository;
    private final CountryRepository countryRepository;
    private final Slugify slugify;

    public List<Movie> getAllMovies(Boolean status) {
        log.info("Get all movies");
        if (status != null) {
            return movieRepository.findByStatusOrderByCreatedAtDesc(status);
        }
        return movieRepository.findAll(Sort.by("createdAt").descending());
    }

    public Page<Movie> getAllMovies(Integer page, Integer limit) {
        log.info("Get all movies");
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("showDate").descending());
        return movieRepository.findByStatus(true, pageable);
    }

    public Page<Movie> searchMovies(Integer page, Integer limit, String genre, String country, Integer releaseYear, String keyword) {
        log.info("Search movies by genre = {}, country = {}, releaseYear = {}, keyword = {}", genre, country, releaseYear, keyword);
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("showDate").descending());
        Specification<Movie> spec = MovieSpecification.getMoviesByCriteria(genre, country, releaseYear, keyword, true);
        return movieRepository.findAll(spec, pageable);
    }

    public Movie getMovieDetail(Integer id, String slug) {
        log.info("Get movie detail by id = {}", id);
        return movieRepository.findByIdAndSlugAndStatus(id, slug, true)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
    }

    public Page<Movie> getAllReviewsOfMovies(Integer page, Integer limit) {
        log.info("Get all reviews of movies");
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Movie> pageData = movieRepository.findByStatus(true, pageable);

        pageData.getContent().forEach(movie -> {
            Set<Review> reviews = movie.getReviews();
            List<Review> sortedReviews = reviews.stream()
                    .sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                    .toList();
            movie.setReviews(new LinkedHashSet<>(sortedReviews));
        });

        return pageData;
    }

    public List<Movie> getShowingNowMovies() {
        log.info("Get showing now movies");
        List<Schedule> schedules = scheduleRepository.findByMovie_StatusAndStartDateBeforeAndEndDateAfter(true, new Date(), new Date());
        return schedules.stream().map(Schedule::getMovie).toList();
    }

    public List<Movie> getComingSoonMovies() {
        log.info("Get coming soon movies");
        List<Schedule> schedules = scheduleRepository.findByMovie_StatusAndStartDateAfter(true, new Date());
        return schedules.stream().map(Schedule::getMovie).toList();
    }

    public Movie getMovieById(Integer id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
    }

    public Movie saveMovie(UpsertMovieRequest request) {
        Country country = countryRepository.findById(request.getCountryId())
                .orElseThrow(() -> new ResourceNotFoundException("Country not found"));
        List<Genre> genreList = genreRepository.findAllById(request.getGenreIds());
        List<Actor> actorList = actorRepository.findAllById(request.getActorIds());
        List<Director> directorList = directorRepository.findAllById(request.getDirectorIds());

        Movie movie = Movie.builder()
                .name(request.getName())
                .nameEn(request.getNameEn())
                .slug(slugify.slugify(request.getName()))
                .trailer(request.getTrailer())
                .description(request.getDescription())
                .poster(StringUtils.generateLinkImage(request.getName()))
                .releaseYear(request.getReleaseYear())
                .duration(request.getDuration())
                .status(request.getStatus())
                .showDate(request.getShowDate())
                .age(request.getAge())
                .country(country)
                .graphics(request.getGraphics())
                .translations(request.getTranslations())
                .genres(new HashSet<>(genreList))
                .actors(new HashSet<>(actorList))
                .directors(new HashSet<>(directorList))
                .build();
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Integer id, UpsertMovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        Country country = countryRepository.findById(request.getCountryId())
                .orElseThrow(() -> new ResourceNotFoundException("Country not found"));

        List<Genre> genreList = genreRepository.findAllById(request.getGenreIds());
        List<Actor> actorList = actorRepository.findAllById(request.getActorIds());
        List<Director> directorList = directorRepository.findAllById(request.getDirectorIds());

        movie.setName(request.getName());
        movie.setNameEn(request.getNameEn());
        movie.setSlug(slugify.slugify(request.getName()));
        movie.setTrailer(request.getTrailer());
        movie.setDescription(request.getDescription());
        movie.setPoster(request.getPoster());
        movie.setReleaseYear(request.getReleaseYear());
        movie.setDuration(request.getDuration());
        movie.setStatus(request.getStatus());
        movie.setShowDate(request.getShowDate());
        movie.setAge(request.getAge());
        movie.setCountry(country);
        movie.setGraphics(request.getGraphics());
        movie.setTranslations(request.getTranslations());
        movie.setGenres(new HashSet<>(genreList));
        movie.setActors(new HashSet<>(actorList));
        movie.setDirectors(new HashSet<>(directorList));
        return movieRepository.save(movie);
    }

    public void deleteMovie(Integer id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
        movieRepository.deleteById(id);
    }

    public List<Movie> getAllMoviesInSchedule() {
        // Lấy danh sách movie trong schedule đang có lịch chiếu hoặc sắp chiếu
        List<Schedule> schedules = scheduleRepository.findByMovie_StatusAndEndDateAfter(true, new Date());
        return schedules.stream().map(Schedule::getMovie).toList();
    }

    public List<Movie> getAllMoviesInSchedule(String dateStr) {
        log.info("Get all movies in schedule by date = {}", dateStr);
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Date date = null;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException(e.getMessage());
        }
        // Lấy danh sách movie trong schedule đang có lịch chiếu hoặc sắp chiếu
        List<Schedule> schedules = scheduleRepository.findByMovie_StatusAndEndDateAfter(true, date);
        return schedules.stream().map(Schedule::getMovie).toList();
    }
}
