package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Director;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertDirectorRequest;
import com.example.movie.ticket.booking.application.repository.DirectorRepository;
import com.example.movie.ticket.booking.application.repository.MovieRepository;
import com.example.movie.ticket.booking.application.utils.FileUtils;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DirectorService {
    private final MovieRepository movieRepository;
    private final DirectorRepository directorRepository;

    public List<Director> getAllDirectors() {
        return directorRepository.findAll(Sort.by("createdAt").descending());
    }

    public Page<Director> getAllDirectors(Integer page, Integer size) {
        return directorRepository.findAll(PageRequest.of(page, size));
    }

    public Director getDirectorById(Integer id) {
        return directorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đạo diễn có id = " + id));
    }

    public Director saveDirector(UpsertDirectorRequest request) {
        Director director = Director.builder()
                .name(request.getName())
                .description(request.getDescription())
                .birthday(request.getBirthday())
                .avatar(StringUtils.generateLinkImage(request.getName()))
                .build();
        return directorRepository.save(director);
    }

    public Director updateDirector(Integer id, UpsertDirectorRequest request) {
        Director existingDirector = directorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đạo diễn có id = " + id));

        existingDirector.setName(request.getName());
        existingDirector.setDescription(request.getDescription());
        existingDirector.setBirthday(request.getBirthday());
        existingDirector.setAvatar(request.getAvatar());
        return directorRepository.save(existingDirector);
    }

    public void deleteDirector(Integer id) {
        Director existingDirector = directorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đạo diễn có id = " + id));

        long count = movieRepository.countByDirectors_Id(id);
        if (count > 0) {
            throw new BadRequestException("Không thể xóa đạo diễn này vì đang áp dụng cho phim");
        }

        directorRepository.deleteById(id);
    }
}
