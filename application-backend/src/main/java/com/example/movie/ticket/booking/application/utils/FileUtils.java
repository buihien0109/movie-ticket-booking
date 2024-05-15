package com.example.movie.ticket.booking.application.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
public class FileUtils {
    private static final String uploadDir = "image_uploads";

    public static void createDirectory(String name) {
        Path path = Paths.get(name);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                log.error("Không thể tạo thư mục upload");
                log.error(e.getMessage());
                throw new RuntimeException("Could not create upload folder");
            }
        }
    }

    public static void deleteFile(String id) {
        log.info("Xóa file: {}", id);
        Path rootPath = Paths.get(uploadDir);
        Path filePath = rootPath.resolve(id);

        try {
            Files.delete(filePath);
        } catch (IOException e) {
            log.error("Không thể xóa file: {}", id);
            log.error(e.getMessage());
            throw new RuntimeException("Could not delete file: " + id);
        }
    }

    // URL: /api/public/images/{id}. id is the name of the file in the image_uploads directory.
    public static void deleteFileByURL(String url) {
        if (url == null || !url.startsWith("/api/public/images/")) {
            return;
        }
        String id = url.substring(url.lastIndexOf("/") + 1);
        deleteFile(id);
    }
}
