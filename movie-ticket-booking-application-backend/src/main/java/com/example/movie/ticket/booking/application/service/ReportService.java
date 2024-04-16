package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.model.dto.CinemaRevenueDto;
import com.example.movie.ticket.booking.application.model.dto.MovieRevenueDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        try (Workbook workbook = new XSSFWorkbook()) {
            // Create CellStyle for title row
            CellStyle titleStyle = createTitleStyle(workbook);
            // Create CellStyle for date row
            CellStyle dateStyle = createDateStyle(workbook);
            // Create CellStyle for header row
            CellStyle headerStyle = createHeaderStyle(workbook);
            // Create CellStyle for data cells
            CellStyle dataStyle = createDataStyle(workbook);

            // Create "Báo cáo doanh thu" sheet
            Sheet revenueSheet = workbook.createSheet("Báo cáo doanh thu");
            createSheetHeaderOfRevenueMovieSheet(revenueSheet, startDate, endDate);
            List<MovieRevenueDto> movieRevenueDtos = dashboardService.getRevenueByMovie(startDate, endDate);
            createSheetContentOfRevenueMovieSheet(revenueSheet, movieRevenueDtos);

            // Apply styles to the sheets
            applyStyles(revenueSheet, titleStyle, dateStyle, headerStyle, dataStyle);

            // Write the workbook content to a ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            throw new BadRequestException("Có lỗi xảy ra khi tạo báo cáo: " + e.getMessage());
        }
    }

    private void createSheetContentOfRevenueMovieSheet(Sheet sheet, List<MovieRevenueDto> movieRevenueDtos) {
        int rowNum = 3; // Starting row after title and header
        for (MovieRevenueDto movie : movieRevenueDtos) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(movie.getMovieName());
            row.createCell(1).setCellValue(movie.getTotalTickets());
            row.createCell(2).setCellValue(movie.getTotalRevenue());
        }
    }

    private void createSheetHeaderOfRevenueMovieSheet(Sheet sheet, String startDate, String endDate) {
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 6));

        int rowNum = 0;
        Row titleRow = sheet.createRow(rowNum++);
        titleRow.createCell(0).setCellValue("Báo cáo doanh thu theo phim");

        Row dateRow = sheet.createRow(rowNum++);
        dateRow.createCell(0).setCellValue("Từ ngày");

        Row headerRow = sheet.createRow(rowNum);
        headerRow.createCell(0).setCellValue("Tên phim");
        headerRow.createCell(1).setCellValue("Số vé bán ra");
        headerRow.createCell(2).setCellValue("Doanh thu");
    }

    private CellStyle createTitleStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 16);
        font.setBold(true);
        font.setColor(IndexedColors.BLACK.getIndex());
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.LIGHT_ORANGE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFont(font);
        return style;
    }

    private CellStyle createDateStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 12);
        font.setItalic(true);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setFont(font);
        return style;
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 12);
        font.setBold(true);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFont(font);
        style.setBorderBottom(BorderStyle.MEDIUM);
        return style;
    }

    private CellStyle createDataStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 12);
        style.setAlignment(HorizontalAlignment.LEFT);
        style.setFont(font);
        return style;
    }

    private void applyStyles(Sheet sheet, CellStyle titleStyle, CellStyle dateStyle, CellStyle headerStyle, CellStyle dataStyle) {
        // Apply title style to the title row
        sheet.getRow(0).getCell(0).setCellStyle(titleStyle);

        // Apply date style to the date row
        sheet.getRow(1).getCell(0).setCellStyle(dateStyle);

        // Apply header style to the header row
        Row headerRow = sheet.getRow(2);
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        // Apply data style to all data cells
        for (int i = 3; i < sheet.getPhysicalNumberOfRows(); i++) {
            Row row = sheet.getRow(i);
            for (Cell cell : row) {
                cell.setCellStyle(dataStyle);
            }
        }
    }

}
