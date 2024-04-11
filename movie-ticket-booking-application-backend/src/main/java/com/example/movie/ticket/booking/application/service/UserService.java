package com.example.movie.ticket.booking.application.service;

import com.example.movie.ticket.booking.application.constant.ConstantValue;
import com.example.movie.ticket.booking.application.entity.Image;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.exception.BadRequestException;
import com.example.movie.ticket.booking.application.exception.ResourceNotFoundException;
import com.example.movie.ticket.booking.application.model.request.CreateUserRequest;
import com.example.movie.ticket.booking.application.model.request.UpdatePasswordRequest;
import com.example.movie.ticket.booking.application.model.request.UpdateProfileUserRequest;
import com.example.movie.ticket.booking.application.model.request.UpdateUserRequest;
import com.example.movie.ticket.booking.application.model.response.ImageResponse;
import com.example.movie.ticket.booking.application.repository.ImageRepository;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import com.example.movie.ticket.booking.application.security.SecurityUtils;
import com.example.movie.ticket.booking.application.utils.FileUtils;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ImageRepository imageRepository;
    private final ImageService imageService;

    public List<User> getAllUsers() {
        return userRepository.findAll(Sort.by("createdAt").descending());
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));
    }

    public User createUser(CreateUserRequest request) {
        // find user by email -> throw exception if exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email đã tồn tại");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatar(StringUtils.generateLinkImage(request.getName()))
                .role(request.getRole())
                .enabled(true)
                .build();
        return userRepository.save(user);
    }

    public User updateUser(Integer id, UpdateUserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        existingUser.setName(request.getName());
        existingUser.setPhone(request.getPhone());
        existingUser.setRole(request.getRole());
        existingUser.setAvatar(request.getAvatar());
        existingUser.setEnabled(request.getEnabled());
        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        // delete all images of user in database and file server
        List<Image> images = imageRepository.findByUser_Id(id);
        images.forEach(image -> {
            imageService.deleteImage(image.getId());
            imageRepository.delete(image);
        });

        userRepository.delete(existingUser);
    }

    public String resetPassword(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        user.setPassword(passwordEncoder.encode(ConstantValue.DEFAULT_PASSWORD));
        userRepository.save(user);
        return ConstantValue.DEFAULT_PASSWORD;
    }

    public ImageResponse updateAvatar(MultipartFile file) {
        User user = SecurityUtils.getCurrentUserLogin();

        FileUtils.deleteFileByURL(user.getAvatar());

        ImageResponse imageResponse = imageService.uploadImage(file);
        user.setAvatar(imageResponse.getUrl());
        userRepository.save(user);
        return imageResponse;
    }

    public void updateProfile(UpdateProfileUserRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();
        user.setName(request.getName());
        user.setPhone(request.getPhone());

        userRepository.save(user);
    }

    public void updatePassword(UpdatePasswordRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu cũ không đúng");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Mật khẩu mới và xác nhận mật khẩu không khớp");
        }

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu mới không được trùng với mật khẩu cũ");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
