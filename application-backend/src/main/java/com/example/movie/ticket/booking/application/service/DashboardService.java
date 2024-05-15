package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.model.dto.BlogViewDto;
import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.RevenueDto;
import com.example.movie.ticket.booking.application.repository.BlogRepository;
import com.example.movie.ticket.booking.application.repository.OrderRepository;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import com.example.movie.ticket.booking.application.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    private Map<String, LocalDate> parseDate(String startDate, String endDate) {
        LocalDate start = null;
        LocalDate end = null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        if (startDate != null && endDate != null) {
            start = LocalDate.parse(startDate, formatter);
            end = LocalDate.parse(endDate, formatter);
        } else {
            start = LocalDate.now().withDayOfMonth(1);
            end = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
        }

        Map<String, LocalDate> map = new HashMap<>();
        map.put("start", start);
        map.put("end", end);
        return map;
    }

    public Map<String, Object> getDashboardData(String startDate, String endDate) {
        Map<String, LocalDate> dateMap = parseDate(startDate, endDate);
        LocalDate start = dateMap.get("start");
        LocalDate end = dateMap.get("end");

        Map<String, Object> map = new HashMap<>();
        map.put("countLatestUsers", countLatestUsers(start, end));
        map.put("topViewBlogs", getTopViewBlogs(start, end, 5));
        map.put("movieRevenues", getMovieRevenues(start, end));
        map.put("cinemaRevenues", getCinemaRevenues(start, end));
        map.put("revenueToday", getRevenueToday());
        map.put("revenueByMonth", getRevenueByMonth());
        map.put("revenueCurrentMonth", getRevenueCurrentMonth());
        map.put("totalTicketsCurrentMonth", getTotalTicketsCurrentMonth());
        return map;
    }

    private List<RevenueDto> getRevenueByMonth() {
       return orderRepository.findMonthlyRevenue();
    }

    private long getRevenueToday() {
        LocalDateTime start = DateUtils.atStartOfDay(LocalDate.now());
        LocalDateTime end = DateUtils.atEndOfDay(LocalDate.now());
        List<MovieRevenueDto> movieRevenues = orderRepository.findMovieRevenues(start, end);
        return movieRevenues.stream().mapToLong(MovieRevenueDto::getTotalRevenue).sum();
    }

    private long getRevenueCurrentMonth() {
        LocalDateTime start = DateUtils.atStartOfDay(LocalDate.now().withDayOfMonth(1));
        LocalDateTime end = DateUtils.atEndOfDay(LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()));
        List<MovieRevenueDto> movieRevenues = orderRepository.findMovieRevenues(start, end);
        return movieRevenues.stream().mapToLong(MovieRevenueDto::getTotalRevenue).sum();
    }

    private long getTotalTicketsCurrentMonth() {
        LocalDateTime start = DateUtils.atStartOfDay(LocalDate.now().withDayOfMonth(1));
        LocalDateTime end = DateUtils.atEndOfDay(LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()));
        List<MovieRevenueDto> movieRevenues = orderRepository.findMovieRevenues(start, end);
        return movieRevenues.stream().mapToLong(MovieRevenueDto::getTotalTickets).sum();
    }

    public List<MovieRevenueDto> getMovieRevenues(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = DateUtils.atStartOfDay(startDate);
        LocalDateTime end = DateUtils.atEndOfDay(endDate);
        return orderRepository.findMovieRevenues(start, end);
    }

    public List<CinemaRevenueDto> getCinemaRevenues(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = DateUtils.atStartOfDay(startDate);
        LocalDateTime end = DateUtils.atEndOfDay(endDate);
        return orderRepository.findCinemaRevenues(start, end);
    }

    // Đếm số lượng các user được tạo ra trong tháng hiện tại và tổng số user có trong hệ thống (Map<String, Long>)
    public long countLatestUsers(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = DateUtils.atStartOfDay(startDate);
        LocalDateTime end = DateUtils.atEndOfDay(endDate);
        return userRepository.countByCreatedAtBetween(start, end);
    }

    // Lấy danh sách blog có lượt xem cao nhất trong tháng (sắp xếp theo lượt xem giảm dần)
    public List<BlogViewDto> getTopViewBlogs(LocalDate startDate, LocalDate endDate, Integer limit) {
        LocalDateTime start = DateUtils.atStartOfDay(startDate);
        LocalDateTime end = DateUtils.atEndOfDay(endDate);
        List<BlogViewDto> blogViewDtos = blogRepository.findTopViewBlogs(start, end);
        if (limit != null && limit > 0) {
            return blogViewDtos.subList(0, Math.min(limit, blogViewDtos.size()));
        }
        return blogViewDtos;
    }

    public List<CinemaRevenueDto> getRevenueByCinema(String startDate, String endDate) {
        Map<String, LocalDate> dateMap = parseDate(startDate, endDate);
        LocalDate start = dateMap.get("start");
        LocalDate end = dateMap.get("end");
        return getCinemaRevenues(start, end);
    }

    public List<MovieRevenueDto> getRevenueByMovie(String startDate, String endDate) {
        Map<String, LocalDate> dateMap = parseDate(startDate, endDate);
        LocalDate start = dateMap.get("start");
        LocalDate end = dateMap.get("end");
        return getMovieRevenues(start, end);
    }
}
