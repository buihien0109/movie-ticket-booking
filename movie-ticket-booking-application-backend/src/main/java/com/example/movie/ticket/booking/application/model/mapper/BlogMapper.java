package com.example.movie.ticket.booking.application.model.mapper;

import com.example.movie.ticket.booking.application.entity.Blog;
import com.example.movie.ticket.booking.application.model.dto.BlogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BlogMapper {
    private final UserMapper userMapper;

    public BlogDto toBlogDto(Blog blog) {
        return BlogDto.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .description(blog.getDescription())
                .thumbnail(blog.getThumbnail())
                .publishedAt(blog.getPublishedAt())
                .build();
    }
}
