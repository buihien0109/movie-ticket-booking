package com.example.movie.ticket.booking.application.controller;

import com.example.movie.ticket.booking.application.service.DashboardService;
import com.example.movie.ticket.booking.application.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;
    private final ReportService reportService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@RequestParam(required = false) String startDate,
                                          @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(dashboardService.getDashboardData(startDate, endDate));
    }

    @GetMapping("/revenue/cinema")
    public ResponseEntity<?> getRevenueByCinema(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(dashboardService.getRevenueByCinema(startDate, endDate));
    }

    @GetMapping("/revenue/movie")
    public ResponseEntity<?> getRevenueByMovie(@RequestParam(required = false) String startDate,
                                               @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(dashboardService.getRevenueByMovie(startDate, endDate));
    }

    @GetMapping("/revenue/cinema/export")
    public ResponseEntity<?> exportRevenueByCinema(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        byte[] data = reportService.exportRevenueByCinema(startDate, endDate);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=reports_cinema.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(data);
    }

    @GetMapping("/revenue/movie/export")
    public ResponseEntity<?> exportRevenueByMovie(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        byte[] data = reportService.exportRevenueByMovie(startDate, endDate);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=reports_movie.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(data);
    }
}
