package com.example.movie.ticket.booking.application.service;


import com.example.movie.ticket.booking.application.entity.TokenConfirm;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.dto.UserDto;
import com.example.movie.ticket.booking.application.model.enums.TokenType;
import com.example.movie.ticket.booking.application.model.enums.UserRole;
import com.example.movie.ticket.booking.application.model.mapper.UserMapper;
import com.example.movie.ticket.booking.application.model.request.LoginRequest;
import com.example.movie.ticket.booking.application.model.request.RegisterRequest;
import com.example.movie.ticket.booking.application.model.request.ResetPasswordRequest;
import com.example.movie.ticket.booking.application.model.response.AuthResponse;
import com.example.movie.ticket.booking.application.repository.TokenConfirmRepository;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import com.example.movie.ticket.booking.application.security.JwtUtils;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenConfirmRepository tokenConfirmRepository;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;
    private final MailService mailService;

    public AuthResponse login(LoginRequest request) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );

        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Tạo token
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String tokenJwt = jwtUtils.generateToken(userDetails);

        // TODO: Tạo refresh token

        // Thông tin trả về cho Client
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có email = " + request.getEmail()));
        UserDto userDto = userMapper.toUserDto(user);

        return AuthResponse.builder()
                .user(userDto)
                .accessToken(tokenJwt)
                .refreshToken(null)
                .isAuthenticated(true)
                .build();
    }

    public void register(RegisterRequest request) {
        // check email exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email đã tồn tại");
        }

        // check password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Mật khẩu không khớp");
        }

        // create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);
        user.setAvatar(StringUtils.generateLinkImage(request.getName()));
        user.setEnabled(false);
        userRepository.save(user);
        log.info("New user registered: {}", user);

        // Create token confirm
        TokenConfirm tokenConfirm = new TokenConfirm();
        tokenConfirm.setToken(UUID.randomUUID().toString());
        tokenConfirm.setUser(user);
        tokenConfirm.setType(TokenType.EMAIL_VERIFICATION);
        // set expiry date after 1 day
        tokenConfirm.setExpiryDate(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000));
        tokenConfirmRepository.save(tokenConfirm);
        log.info("Token confirm created: {}", tokenConfirm);

        // send email
        Map<String, String> data = new HashMap<>();
        data.put("email", user.getEmail());
        data.put("username", user.getName());
        data.put("token", tokenConfirm.getToken());
        mailService.sendMailConfirmRegistration(data);
        log.info("Email sent to: {}", user.getEmail());
    }

    @Transactional
    public Map<String, Object> confirmEmail(String token) {
        Map<String, Object> data = new HashMap<>();
        Optional<TokenConfirm> tokenConfirmOptional = tokenConfirmRepository
                .findByTokenAndType(token, TokenType.EMAIL_VERIFICATION);
        if (tokenConfirmOptional.isEmpty()) {
            data.put("success", false);
            data.put("message", "Token xác thực tài khoản không hợp lệ");
            return data;
        }

        TokenConfirm tokenConfirm = tokenConfirmOptional.get();
        if (tokenConfirm.getConfirmedDate() != null) {
            data.put("success", false);
            data.put("message", "Token xác thực tài khoản đã được xác nhận");
            return data;
        }

        if (tokenConfirm.getExpiryDate().before(new Date())) {
            data.put("success", false);
            data.put("message", "Token xác thực tài khoản đã hết hạn");
            return data;
        }

        User user = tokenConfirm.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        tokenConfirm.setConfirmedDate(new Date());
        tokenConfirmRepository.save(tokenConfirm);

        data.put("success", true);
        data.put("message", "Xác thực tài khoản thành công");
        return data;
    }

    public void forgotPassword(String email) {
        log.info("email: {}", email);
        // check email exist
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email"));
        log.info("user: {}", user);
        log.info("user.getEmail(): {}", user.getEmail());

        // Create token confirm
        log.info("Create token confirm");
        TokenConfirm tokenConfirm = new TokenConfirm();
        tokenConfirm.setToken(UUID.randomUUID().toString());
        tokenConfirm.setUser(user);
        tokenConfirm.setType(TokenType.PASSWORD_RESET);
        // set expiry date after 1 day
        tokenConfirm.setExpiryDate(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000));
        tokenConfirmRepository.save(tokenConfirm);

        // send email
        log.info("Send email");
        Map<String, String> data = new HashMap<>();
        data.put("email", user.getEmail());
        data.put("username", user.getName());
        data.put("token", tokenConfirm.getToken());

        mailService.sendMailResetPassword(data);

        log.info("Send mail success");
    }

    @Transactional
    public void changePassword(ResetPasswordRequest request) {
        // check new password and confirm password
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Mật khẩu mới và mật khẩu xác nhận không khớp");
        }

        // get token confirm
        Optional<TokenConfirm> tokenConfirmOptional = tokenConfirmRepository
                .findByTokenAndType(request.getToken(), TokenType.PASSWORD_RESET);

        if (tokenConfirmOptional.isEmpty()) {
            throw new BadRequestException("Token đặt lại mật khẩu không hợp lệ");
        }

        TokenConfirm tokenConfirm = tokenConfirmOptional.get();
        if (tokenConfirm.getConfirmedDate() != null) {
            throw new BadRequestException("Token đặt lại mật khẩu đã được xác nhận");
        }

        if (tokenConfirm.getExpiryDate().before(new Date())) {
            throw new BadRequestException("Token đặt lại mật khẩu đã hết hạn");
        }

        User user = tokenConfirm.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        tokenConfirm.setConfirmedDate(new Date());
        tokenConfirmRepository.save(tokenConfirm);

        log.info("Đặt lại mật khẩu thành công");
    }

    @Transactional
    public Map<String, Object> confirmResetPassword(String token) {
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);

        Optional<TokenConfirm> tokenConfirmOptional = tokenConfirmRepository
                .findByTokenAndType(token, TokenType.PASSWORD_RESET);
        if (tokenConfirmOptional.isEmpty()) {
            data.put("success", false);
            data.put("message", "Token đặt lại mật khẩu không hợp lệ");
            return data;
        }

        TokenConfirm tokenConfirm = tokenConfirmOptional.get();
        if (tokenConfirm.getConfirmedDate() != null) {
            data.put("success", false);
            data.put("message", "Token đặt lại mật khẩu đã được xác nhận");
            return data;
        }

        if (tokenConfirm.getExpiryDate().before(new Date())) {
            data.put("success", false);
            data.put("message", "Token đặt lại mật khẩu đã hết hạn");
            return data;
        }

        data.put("success", true);
        data.put("message", "Token đặt lại mật khẩu hợp lệ");
        return data;
    }
}
