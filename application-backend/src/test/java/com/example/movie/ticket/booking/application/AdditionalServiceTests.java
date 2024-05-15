package com.example.movie.ticket.booking.application;

import com.example.movie.ticket.booking.application.entity.AdditionalService;
import com.example.movie.ticket.booking.application.repository.AdditionalServiceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdditionalServiceTests {

    @Autowired
    private AdditionalServiceRepository additionalServiceRepository;

    @Test
    void save_additional_services() {
        AdditionalService additionalService1 = AdditionalService.builder()
                .name("MY COMBO")
                .price(87000)
                .description("1 bắp lớn + 1 nước siêu lớn. Nhận trong ngày xem phim")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/6465df9cdd41a_1684397981.png")
                .status(true)
                .build();
        additionalServiceRepository.save(additionalService1);

        AdditionalService additionalService2 = AdditionalService.builder()
                .name("HCINEMA COMBO")
                .price(113000)
                .description("1 Bắp Lớn + 2 Nước Siêu Lớn. Nhận trong ngày xem phim")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/6465deb26f2ab_1684397746.png")
                .status(true)
                .build();
        additionalServiceRepository.save(additionalService2);

        AdditionalService additionalService3 = AdditionalService.builder()
                .name("LADIES LOVE SET")
                .price(183000)
                .description("01 ly nhân vật Snoopy/Garfiled (kèm nước) + 01 bắp ngọt lớn")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/65e84cbbad10f_1709722812.png")
                .status(true)
                .build();
        additionalServiceRepository.save(additionalService3);

        AdditionalService additionalService4 = AdditionalService.builder()
                .name("GODZILLA COMBO")
                .price(219000)
                .description("01 Hộp Bí Mật Godzilla + 01 nước ngọt siêu lớn")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/65dda5e222e1e_1709024738.png")
                .status(true)
                .build();
        additionalServiceRepository.save(additionalService4);

        AdditionalService additionalService5 = AdditionalService.builder()
                .name("GHOSTBUSTERS COMBO")
                .price(149000)
                .description("01 Ly thiêt kế phim GhostBusters kèm nước")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/65ddba2e1bafa_1709029934.png")
                .status(true)
                .build();
        additionalServiceRepository.save(additionalService5);

        AdditionalService additionalService6 = AdditionalService.builder()
                .name("KUNGFU PANDA COMBO")
                .price(199000)
                .description("1 Ly thiết kế phim Kungfu Panda (kèm nước)")
                .thumbnail("https://iguov8nhvyobj.vcdn.cloud/media/concession/app/65cf42bea2c8e_1708081855.png")
                .status(true)
                .build();
    }
}
