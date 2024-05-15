package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.utils.crawler.MovieCrawler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MovieCrawlerTests {

    @Autowired
    private MovieCrawler movieCrawler;

    @Test
    void test_movie_crawler() {
        movieCrawler.crawlAllMovie();
    }
}
