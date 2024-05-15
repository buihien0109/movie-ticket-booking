package com.example.movie.ticket.booking.application.repository;

import com.example.movie.ticket.booking.application.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    Optional<Coupon> findByCode(String couponCode);

    boolean existsByCode(String code);

    Optional<Coupon> findByCodeAndStatus(String couponCode, Boolean status);
}