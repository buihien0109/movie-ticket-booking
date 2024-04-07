package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Blog;
import com.example.movie.ticket.booking.application.entity.ViewHistory;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.dto.BlogDto;
import com.example.movie.ticket.booking.application.model.enums.BlogType;
import com.example.movie.ticket.booking.application.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogWebService {
    private final BlogRepository blogRepository;

    public Page<BlogDto> getBlogsLatest(String type, Integer page, Integer limit) {
        log.info("Get latest blogs with type = {}, page = {}, limit = {}", type, page, limit);

        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<BlogDto> pageData;
        if (type == null || type.isEmpty() || type.equals("all")) {
            pageData = blogRepository.findByStatus(true, pageable);
        } else {
            pageData = blogRepository.findByTypeAndStatus(BlogType.valueOf(type), true, pageable);
        }
        return pageData;
    }

    @Transactional
    public Blog getBlogDetail(Integer blogId, String blogSlug) {
        log.info("Get blog detail with id = {} and slug = {}", blogId, blogSlug);
        Blog blog = blogRepository.findByIdAndSlugAndStatus(blogId, blogSlug, true)
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("Không tìm thấy blog có id = %d và slug = %s", blogId, blogSlug)));

        // Save view history
        blog.setViewCount(blog.getViewCount() + 1);
        ViewHistory viewHistory = ViewHistory.builder()
                .blog(blog)
                .build();
        blog.addViewHistory(viewHistory);
        return blogRepository.save(blog);
    }


    public List<BlogDto> getMostViewBlogs(String type, Integer limit) {
        log.info("Get most view blogs with type = {}, limit = {}", type, limit);

        // get most view blog in 2 months latest
        LocalDateTime start = LocalDateTime.now().minusMonths(2);
        LocalDateTime end = LocalDateTime.now();

        List<BlogDto> blogs;
        if (type == null || type.isEmpty() || type.equals("all")) {
            blogs = blogRepository.findMostViewBlog(start, end);
        } else {
            blogs = blogRepository.findMostViewBlogByType(BlogType.valueOf(type), start, end);
        }

        if (blogs.size() > limit) {
            return blogs.subList(0, limit);
        }
        return blogs;
    }

    public Page<BlogDto> getAllBlogs(String type, Integer page, Integer limit) {
        log.info("Get all blogs with type = {}, page = {}, limit = {}", type, page, limit);
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        if (type == null || type.isEmpty() || type.equals("all")) {
            return blogRepository.findByStatus(true, pageable);
        }
        return blogRepository.findByTypeAndStatus(BlogType.valueOf(type), true, pageable);
    }

    public List<BlogDto> getRecommendBlogs(Integer blogId, Integer limit) {
        log.info("Get recommend blogs for blog id = {}", blogId);
        List<BlogDto> blogs = blogRepository.findRecommendBlogs(blogId);
        if (blogs.size() > limit) {
            return blogs.subList(0, limit);
        }
        return blogs;
    }
}
