package com.example.movie.ticket.booking.application.controller.web;

import com.example.movie.ticket.booking.application.service.BlogWebService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/public/blogs")
@RequiredArgsConstructor
public class BlogWebController {
    private final BlogWebService blogWebService;

    @GetMapping
    public ResponseEntity<?> getAllBlogs(@RequestParam(required = false) String type,
                                         @RequestParam(required = false, defaultValue = "1") Integer page,
                                         @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogWebService.getAllBlogs(type, page, limit));
    }

    @GetMapping("/load-more")
    public ResponseEntity<?> loadMoreBlogs(@RequestParam(required = false) String type,
                                           @RequestParam(required = false, defaultValue = "1") Integer page,
                                           @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogWebService.getAllBlogs(type, page, limit));
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getBlogsLatest(
            @RequestParam(required = false) String type,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogWebService.getBlogsLatest(type, page, limit));
    }

    @GetMapping("/most-view")
    public ResponseEntity<?> getMostViewBlogs(
            @RequestParam(required = false) String type,
            @RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(blogWebService.getMostViewBlogs(type, limit));
    }

    @GetMapping("/{id}/recommend")
    public ResponseEntity<?> getRecommendBlogs(
            @RequestParam(required = false, defaultValue = "5") Integer limit,
            @PathVariable Integer id) {
        return ResponseEntity.ok(blogWebService.getRecommendBlogs(id, limit));
    }

    @GetMapping("/{id}/{slug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(blogWebService.getBlogDetail(id, slug));
    }
}
