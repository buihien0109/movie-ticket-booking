package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.entity.Auditorium;
import com.example.movie.ticket.booking.application.entity.Cinema;
import com.example.movie.ticket.booking.application.entity.Seat;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.enums.SeatType;
import com.example.movie.ticket.booking.application.model.request.UpsertAuditorium;
import com.example.movie.ticket.booking.application.repository.AuditoriumRepository;
import com.example.movie.ticket.booking.application.repository.CinemaRepository;
import com.example.movie.ticket.booking.application.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditoriumService {
    private final AuditoriumRepository auditoriumRepository;
    private final CinemaRepository cinemaRepository;
    private final SeatRepository seatRepository;

    public List<Auditorium> getAllAuditorium() {
        return auditoriumRepository.findAll();
    }

    public Auditorium getAuditoriumById(Integer id) {
        return auditoriumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng chiếu có id = " + id));
    }

    @Transactional
    public Auditorium saveAuditorium(UpsertAuditorium request) {
        Cinema cinema = cinemaRepository.findById(request.getCinemaId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim có id = " + request.getCinemaId()));

        // Tạo mới một phòng chiếu
        Auditorium auditorium = Auditorium.builder()
                .name(request.getName())
                .totalRows(request.getTotalRows())
                .totalColumns(request.getTotalColumns())
                .type(request.getType())
                .cinema(cinema)
                .build();
        auditoriumRepository.save(auditorium);

        // Tạo ghế ngồi cho phòng chiếu
        createSeatsByAuditorium(request, auditorium);

        return auditorium;
    }

    private void createSeatsByAuditorium(UpsertAuditorium request, Auditorium auditorium) {
        for (int i = 1; i <= request.getTotalRows(); i++) {
            for (int j = 1; j <= request.getTotalColumns(); j++) {
                // Tạo code ghế ngồi theo định dạng: A1, A2, A3, ..., B1, B2, B3, ...
                String code = (char) (i + 64) + String.valueOf(j);
                Seat seat = Seat.builder()
                        .auditorium(auditorium)
                        .rowIndex(i)
                        .colIndex(j)
                        .code(code)
                        .type(SeatType.NORMAL)
                        .status(true)
                        .build();
                seatRepository.save(seat);
            }
        }
    }

    @Transactional
    public Auditorium updateAuditorium(Integer id, UpsertAuditorium request) {
        log.info("Updating auditorium with id = {}", id);
        log.info("Request: {}", request);

        Auditorium existingAuditorium = auditoriumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng chiếu có id = " + id));

        Cinema cinema = cinemaRepository.findById(request.getCinemaId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim có id = " + request.getCinemaId()));

        // Nếu không thay đổi row hoặc column thì không cần tạo lại ghế ngồi
        if (!Objects.equals(request.getTotalRows(), existingAuditorium.getTotalRows()) || !Objects.equals(request.getTotalColumns(), existingAuditorium.getTotalColumns())) {
            seatRepository.deleteByAuditorium_Id(id);
            createSeatsByAuditorium(request, existingAuditorium);
        }

        existingAuditorium.setName(request.getName());
        existingAuditorium.setTotalRows(request.getTotalRows());
        existingAuditorium.setTotalColumns(request.getTotalColumns());
        existingAuditorium.setType(request.getType());
        existingAuditorium.setCinema(cinema);

        return auditoriumRepository.save(existingAuditorium);
    }

    public void deleteAuditorium(Integer id) {
        Auditorium existingAuditorium = auditoriumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng chiếu có id = " + id));

        auditoriumRepository.deleteById(id);
    }

    public List<Auditorium> getAuditoriumsByCinema(Integer cinemaId) {
        Cinema cinema = cinemaRepository.findById(cinemaId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rạp chiếu phim có id = " + cinemaId));

        return auditoriumRepository.findByCinema_Id(cinemaId);
    }

    public List<Seat> getSeatsByAuditorium(Integer id) {
        Auditorium auditorium = auditoriumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng chiếu có id = " + id));

        return seatRepository.findByAuditorium_Id(id);
    }
}
