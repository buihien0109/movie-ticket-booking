package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportService {
    private final DashboardService dashboardService;

    public byte[] exportRevenueByCinema(String startDate, String endDate) {
        try {
            List<CinemaRevenueDto> cinemaRevenueDtos = dashboardService.getRevenueByCinema(startDate, endDate);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Doanh thu theo rạp");

            // Tạo phông chữ tiêu đề
            Font headerFont = workbook.createFont();
            headerFont.setFontName("Arial");
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 14);

            // Tạo kiểu dáng cell tiêu đề
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Row 1: Tiêu đề báo cáo
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("Báo cáo doanh thu theo rạp");
            titleCell.setCellStyle(headerCellStyle);

            // Row 2: Thời gian
            Row dateRow = sheet.createRow(1);
            Cell dateCell = dateRow.createCell(0);
            dateCell.setCellValue("Từ ngày " + startDate + " đến ngày " + endDate);
            dateCell.setCellStyle(headerCellStyle);

            // Row 3: Tiêu đề cột
            Row headerRow = sheet.createRow(2);
            String[] columns = {"Tên rạp", "Số vé bán ra", "Doanh thu"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerCellStyle);
            }

            // Điền dữ liệu
            int rowNum = 3;
            for (CinemaRevenueDto dto : cinemaRevenueDtos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(dto.getCinemaName());
                row.createCell(1).setCellValue(dto.getTotalTickets());
                row.createCell(2).setCellValue(dto.getTotalRevenue());
            }

            // Tự động điều chỉnh kích thước cột
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Ghi dữ liệu vào stream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            workbook.close();

            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Có lỗi xảy ra khi tạo báo cáo");
        }
    }

    public byte[] exportRevenueByMovie(String startDate, String endDate) {
        try {
            List<MovieRevenueDto> movieRevenueDtos = dashboardService.getRevenueByMovie(startDate, endDate);

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Doanh thu theo phim");

            // Tạo phông chữ tiêu đề
            Font headerFont = workbook.createFont();
            headerFont.setFontName("Arial");
            headerFont.setBold(true);
            headerFont.setFontHeightInPoints((short) 14);

            // Tạo kiểu dáng cell tiêu đề
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Row 1: Tiêu đề báo cáo
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("Báo cáo doanh thu theo phim");
            titleCell.setCellStyle(headerCellStyle);

            // Row 2: Thời gian
            Row dateRow = sheet.createRow(1);
            Cell dateCell = dateRow.createCell(0);
            dateCell.setCellValue("Từ ngày " + startDate + " đến ngày " + endDate);
            dateCell.setCellStyle(headerCellStyle);

            // Row 3: Tiêu đề cột
            Row headerRow = sheet.createRow(2);
            String[] columns = {"Tên phim", "Số vé bán ra", "Doanh thu"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerCellStyle);
            }

            // Điền dữ liệu
            int rowNum = 3;
            for (MovieRevenueDto dto : movieRevenueDtos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(dto.getMovieName());
                row.createCell(1).setCellValue(dto.getTotalTickets());
                row.createCell(2).setCellValue(dto.getTotalRevenue());
            }

            // Tự động điều chỉnh kích thước cột
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Ghi dữ liệu vào stream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            workbook.close();

            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Có lỗi xảy ra khi tạo báo cáo");
        }
    }
}
