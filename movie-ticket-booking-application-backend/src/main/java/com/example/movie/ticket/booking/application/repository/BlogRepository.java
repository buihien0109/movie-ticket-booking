package com.example.movie.ticket.booking.application.repository;


import com.example.movie.ticket.booking.application.entity.Blog;
import com.example.movie.ticket.booking.application.model.dto.BlogDto;
import com.example.movie.ticket.booking.application.model.dto.BlogViewDto;
import com.example.movie.ticket.booking.application.model.enums.BlogType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b where b.status = ?1")
    Page<BlogDto> findByStatus(Boolean status, Pageable pageable);

    Optional<Blog> findByIdAndSlugAndStatus(Integer id, String slug, Boolean status);

    List<Blog> findByUser_IdOrderByCreatedAtDesc(Integer id);

    List<Blog> findByOrderByCreatedAtDesc();

    Page<Blog> findByOrderByCreatedAtDesc(Pageable pageable);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // join to view history to get view count in time range
    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogViewDto(b.id, b.title, count(vh.id)) from Blog b join ViewHistory vh on b.id = vh.blog.id where vh.viewedAt between ?1 and ?2 group by b.id order by sum(vh.id) desc")
    List<BlogViewDto> findTopViewBlogs(LocalDateTime start, LocalDateTime end);

    // get most view blog in 2 months latest. Join to view history to get view count -> return blog
    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b join ViewHistory vh on b.id = vh.blog.id where b.status = true and vh.viewedAt between ?1 and ?2 group by b.id order by count(vh.id) desc")
    List<BlogDto> findMostViewBlog(LocalDateTime start, LocalDateTime end);

    // get recommend blog by type. get 5 recommend blog is blog same type of blogId and not in blogId and status = true and order by view desc, publishedAt desc
    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b left join ViewHistory vh on b.id = vh.blog.id where b.type = (select b.type from Blog b where b.id = ?1) and b.id != ?1 and b.status = true group by b.id order by count(vh.id) desc, b.publishedAt desc")
    List<BlogDto> findRecommendBlogs(Integer blogId);

    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b where b.type = ?1 and b.status = ?2")
    Page<BlogDto> findByTypeAndStatus(BlogType type, boolean b, Pageable pageable);

    @Query("select new com.example.movie.ticket.booking.application.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b join ViewHistory vh on b.id = vh.blog.id where b.type = ?1 and b.status = true and vh.viewedAt between ?2 and ?3 group by b.id order by count(vh.id) desc")
    List<BlogDto> findMostViewBlogByType(BlogType blogType, LocalDateTime start, LocalDateTime end);
}