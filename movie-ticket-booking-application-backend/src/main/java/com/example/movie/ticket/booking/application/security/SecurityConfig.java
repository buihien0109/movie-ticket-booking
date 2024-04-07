package com.example.movie.ticket.booking.application.security;

import com.example.movie.ticket.booking.application.security.error.CustomAccessDenied;
import com.example.movie.ticket.booking.application.security.error.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthenticationProvider authenticationProvider;
    private final JwtCustomFilter jwtCustomFilter;
    private final CustomAccessDenied customAccessDenied;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                        .requestMatchers("/api/reviews", "/api/reviews/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/seat-reservations/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().permitAll()
        );
        http.exceptionHandling(exceptionHandling ->
                exceptionHandling
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDenied)
        );
        http.sessionManagement(sessionManagement ->
                sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
        http.authenticationProvider(authenticationProvider);
        http.addFilterBefore(jwtCustomFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
