package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.utils.crawler.BlogCrawler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BlogTests {
    @Autowired
    private BlogCrawler blogCrawler;

    @Test
    void crawler_crawlBlogPhimChieuRap() {
        blogCrawler.crawlBlogPhimChieuRap();
    }

    @Test
    void crawler_crawlBlogTongHopPhim() {
        blogCrawler.crawlBlogTongHopPhim();
    }

    @Test
    void crawler_crawlBlogPhimNetflix() {
        blogCrawler.crawlBlogPhimNetflix();
    }
}
