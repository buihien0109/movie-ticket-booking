package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    List<Schedule> findByStartDateBeforeAndEndDateAfter(Date startDate, Date endDate);

    List<Schedule> findByStartDateAfter(Date date);

    List<Schedule> findByMovie_StatusAndStartDateBeforeAndEndDateAfter(Boolean movieStatus, Date startDate, Date endDate);

    List<Schedule> findByMovie_StatusAndStartDateAfter(Boolean movieStatus, Date date);

    List<Schedule> findByMovieIdAndEndDateAfter(Integer movieId, Date startDate);

    List<Schedule> findByMovie_StatusAndEndDateAfter(Boolean movieStatus, Date date);

    List<Schedule> findByMovie_Id(Integer movieId);
}