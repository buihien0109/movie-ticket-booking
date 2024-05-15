package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.AdditionalService;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.UpsertAdditionalService;
import com.example.movie.ticket.booking.application.repository.AdditionalServiceRepository;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdditionalServices {
    private final AdditionalServiceRepository additionalServiceRepository;

    public List<AdditionalService> getAllAdditionalServicesByStatus(Boolean status) {
        return additionalServiceRepository.findByStatus(status);
    }

    public List<AdditionalService> getAllAdditionalServices() {
        return additionalServiceRepository.findAll();
    }

    public AdditionalService getAdditionalServiceById(Integer id) {
        return additionalServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dịch vụ có id = " + id));
    }

    public AdditionalService saveAdditionalService(UpsertAdditionalService request) {
        AdditionalService additionalService = AdditionalService.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .status(request.getStatus())
                .thumbnail(StringUtils.generateLinkImage(request.getName()))
                .build();

        return additionalServiceRepository.save(additionalService);
    }

    public AdditionalService updateAdditionalService(Integer id, UpsertAdditionalService request) {
        AdditionalService additionalService = additionalServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dịch vụ có id = " + id));

        additionalService.setName(request.getName());
        additionalService.setDescription(request.getDescription());
        additionalService.setPrice(request.getPrice());
        additionalService.setStatus(request.getStatus());
        additionalService.setThumbnail(request.getThumbnail());

        return additionalServiceRepository.save(additionalService);
    }

    public void deleteAdditionalService(Integer id) {
        AdditionalService additionalService = additionalServiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dịch vụ có id = " + id));

        additionalServiceRepository.delete(additionalService);
    }
}
