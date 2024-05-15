package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.model.enums.UserRole;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import com.example.movie.ticket.booking.application.utils.StringUtils;
import com.github.slugify.Slugify;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Random;

@SpringBootTest
public class UserTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Slugify slugify;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    void save_users() {
        for (int i = 0; i < 30; i++) {
            String name = generateName();
            User user = User.builder()
                    .name(name)
                    .email(generateEmail(name))
                    .phone(generatePhone())
                    .avatar(StringUtils.generateLinkImage(name))
                    .password(passwordEncoder.encode("123"))
                    .role(UserRole.USER)
                    .enabled(true)
                    .build();

            userRepository.save(user);
        }
    }

    public String generateName() {
        List<String> listHo = List.of(
                "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng",
                "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Đào", "Đinh", "Lâm", "Phùng", "Mai",
                "Tô", "Trịnh", "Đoàn", "Tăng", "Bành", "Hà", "Thái", "Tạ", "Tăng", "Thi"
        );

        // Random ds tên đệm người dùng theo tên gọi Việt Nam
        List<String> listTenDem = List.of(
                "Văn", "Thị", "Hồng", "Hải", "Hà", "Hưng", "Hùng", "Hạnh", "Hạ", "Thanh", "Vũ", "Minh", "Anh", "Duy", "Dương", "Đức", "Đăng", "Đạt", "Điệp", "Đinh", "Đông", "Đức"
        );

        // Random ds tên người dùng theo tên gọi Việt Nam (30 tên phổ biến từ A -> Z) (ít vần H)
        List<String> listTen = List.of(
                "An", "Bình", "Cường", "Dũng", "Đức", "Giang", "Hải", "Hào", "Hùng", "Hưng", "Minh", "Nam", "Nghĩa", "Phong", "Phúc", "Quân", "Quang", "Quốc", "Sơn", "Thắng", "Thành", "Thiên", "Thịnh", "Thuận", "Tiến", "Trung", "Tuấn", "Vinh", "Vũ", "Xuân", "Yên", "Hoa", "Huy", "Hà", "Hân", "Hòa", "Hồng", "Hương", "Hưng", "Hạnh", "Hải", "Hậu", "Hằng"
        );

        Random random = new Random();
        String ho = listHo.get(random.nextInt(listHo.size()));
        String tenDem = listTenDem.get(random.nextInt(listTenDem.size()));
        String ten = listTen.get(random.nextInt(listTen.size()));

        return ho + " " + tenDem + " " + ten;
    }

    public String generatePhone() {
        // Random ds số điện thoại Việt Nam bao gồm 10 số
        List<String> phones = List.of(
                "086", "096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039",
                "090", "093", "070", "079", "077", "076", "078", "089", "088", "091", "094", "083",
                "085", "081", "082", "092", "056", "058", "099"
        );

        Random random = new Random();
        StringBuilder phone = new StringBuilder(phones.get(random.nextInt(phones.size())));
        for (int i = 0; i < 7; i++) {
            phone.append(random.nextInt(10));
        }
        return phone.toString();
    }

    public String generateEmail(String name) {
        return slugify.slugify(name.toLowerCase()).replaceAll("-", "") + "@gmail.com";
    }
}
