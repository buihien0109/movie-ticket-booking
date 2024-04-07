package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Blog;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertBlogRequest;
import com.example.movie.ticket.booking.application.repository.BlogRepository;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    private final Slugify slugify;

    public List<Blog> getAllBlog() {
        return blogRepository.findByOrderByCreatedAtDesc();
    }

    @Transactional
    public Blog createBlog(UpsertBlogRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .slug(slugify.slugify(request.getTitle()))
                .content(request.getContent())
                .description(request.getDescription())
                .thumbnail(StringUtils.generateLinkImage(request.getTitle()))
                .status(request.getStatus())
                .type(request.getType())
                .user(user)
                .build();
        return blogRepository.save(blog);
    }

    public Blog getBlogById(Integer id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));
    }

    @Transactional
    public Blog updateBlog(Integer id, UpsertBlogRequest request) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));

        blog.setTitle(request.getTitle());
        blog.setSlug(slugify.slugify(request.getTitle()));
        blog.setDescription(request.getDescription());
        blog.setContent(request.getContent());
        blog.setStatus(request.getStatus());
        blog.setType(request.getType());
        blog.setThumbnail(request.getThumbnail());
        return blogRepository.save(blog);
    }

    @Transactional
    public void deleteBlog(Integer id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));
        blogRepository.delete(blog);
    }

    public List<Blog> getOwnBlogs() {
        User user = SecurityUtils.getCurrentUserLogin();
        return blogRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());
    }
}
