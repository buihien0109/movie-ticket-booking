package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.model.request.UpsertBlogRequest;
import com.example.movie.ticket.booking.application.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/public/blogs")
    public ResponseEntity<?> getAllBlogs(@RequestParam(required = false) String type,
                                         @RequestParam(required = false, defaultValue = "1") Integer page,
                                         @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogService.getAllBlogs(type, page, limit));
    }

    @GetMapping("/public/blogs/load-more")
    public ResponseEntity<?> loadMoreBlogs(@RequestParam(required = false) String type,
                                           @RequestParam(required = false, defaultValue = "1") Integer page,
                                           @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogService.getAllBlogs(type, page, limit));
    }

    @GetMapping("/public/blogs/latest")
    public ResponseEntity<?> getBlogsLatest(@RequestParam(required = false) String type,
                                            @RequestParam(required = false, defaultValue = "1") Integer page,
                                            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(blogService.getBlogsLatest(type, page, limit));
    }

    @GetMapping("/public/blogs/most-view")
    public ResponseEntity<?> getMostViewBlogs(@RequestParam(required = false) String type,
                                              @RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(blogService.getMostViewBlogs(type, limit));
    }

    @GetMapping("/public/blogs/{id}/recommend")
    public ResponseEntity<?> getRecommendBlogs(@RequestParam(required = false, defaultValue = "5") Integer limit,
                                               @PathVariable Integer id) {
        return ResponseEntity.ok(blogService.getRecommendBlogs(id, limit));
    }

    @GetMapping("/public/blogs/{id}/{slug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(blogService.getBlogDetail(id, slug));
    }

    @GetMapping("/admin/blogs")
    public ResponseEntity<?> getAllBlog() {
        return ResponseEntity.ok(blogService.getAllBlog());
    }

    @GetMapping("/admin/blogs/own-blogs")
    public ResponseEntity<?> getOwnBlogs() {
        return ResponseEntity.ok(blogService.getOwnBlogs());
    }

    @PostMapping("/admin/blogs")
    public ResponseEntity<?> createBlog(@RequestBody UpsertBlogRequest request) {
        return new ResponseEntity<>(blogService.createBlog(request), HttpStatus.CREATED);
    }

    @GetMapping("/admin/blogs/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @PutMapping("/admin/blogs/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Integer id, @RequestBody UpsertBlogRequest request) {
        return ResponseEntity.ok(blogService.updateBlog(id, request));
    }

    @DeleteMapping("/admin/blogs/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Integer id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}
