package com.example.movie.ticket.booking.application.utils;

import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
public class DateUtils {
    public static Date parseDateTime(String datetimeString) {
        if (datetimeString == null) return null;

        String pattern = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        try {
            return dateFormat.parse(datetimeString);
        } catch (ParseException e) {
            return null;
        }
    }

    public static Date parseDate(String dateString) {
        if (dateString == null) return null;

        String pattern = "dd/MM/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            return null;
        }
    }

    public static String formatDate(Date date) {
        if (date == null) return null;

        String pattern = "dd/MM/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
        return dateFormat.format(date);
    }

    // get start of the day is 00:00:00
    public static Date getStartOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();

        // Lấy thời điểm đầu tiên của ngày
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    // get end of the day is 23:59:59
    public static Date getEndOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();

        // Lấy thời điểm cuối cùng của ngày
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    public static Date randomDateBetweenTwoDates(Date startInclusive, Date endExclusive) {
        long startMillis = startInclusive.getTime();
        long endMillis = endExclusive.getTime();
        long randomMillisSinceEpoch = ThreadLocalRandom
                .current()
                .nextLong(startMillis, endMillis);
        return new Date(randomMillisSinceEpoch);
    }

    public static Date convertLocalDateToDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static LocalDateTime atStartOfDay(LocalDate date) {
        return LocalDateTime.of(date, LocalTime.MIDNIGHT);
    }

    public static LocalDateTime atEndOfDay(LocalDate date) {
        return LocalDateTime.of(date, LocalTime.MAX);
    }
}
