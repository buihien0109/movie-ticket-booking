package com.example.movie.ticket.booking.application.utils.crawler;

import com.example.movie.ticket.booking.application.entity.Blog;
import com.example.movie.ticket.booking.application.entity.User;
import com.example.movie.ticket.booking.application.model.enums.BlogType;
import com.example.movie.ticket.booking.application.model.enums.UserRole;
import com.example.movie.ticket.booking.application.repository.BlogRepository;
import com.example.movie.ticket.booking.application.repository.UserRepository;
import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class BlogCrawler {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final Slugify slugify;

    public void crawlBlogPost(String url, BlogType blogType) {
        try {
            Random random = new Random();
            Document doc = Jsoup.connect(url).get();

            String title = doc.title();
            String slug = slugify.slugify(title);
            String description = doc.selectFirst("meta[name=description]").attr("content");
            Element contentElement = doc.selectFirst(".soju__prose.mx-auto.leading-normal").nextElementSibling();
            // cleanAttributes(contentElement);
            String content = contentElement.html();
            String thumbnail = doc.selectFirst("meta[property=og:image]").attr("content");

            // Random 1 user trong danh sách user ADMIN
            List<User> userList = userRepository.findByRole(UserRole.ADMIN);

            Blog blog = Blog.builder()
                    .title(title)
                    .slug(slug)
                    .description(description)
                    .content(content)
                    .thumbnail(thumbnail)
                    .status(true)
                    .type(blogType)
                    .user(userList.get(random.nextInt(userList.size())))
                    .viewHistories(new HashSet<>())
                    .build();

            log.info("Blog: {}", blog);
            blogRepository.save(blog);
        } catch (IOException e) {
            log.error("Error crawling blog post: {}", e.getMessage());
        }
    }

    private void cleanAttributes(Element element) {
        log.info("Containing HTML: {}", element.html());
        Elements allElements = element.getAllElements();

        for (Element el : allElements) {
            // el.clearAttributes(); // Remove all attributes
            el.removeAttr("class");
            el.removeAttr("id");
        }

        log.info("After cleaning attributes: {}", element);
    }

    public void crawlBlogPhimChieuRap() {
        List<String> urls = new ArrayList<>(List.of(
                "https://momo.vn/cinema/blog/phim-hay-2022-cuc-dac-sac-moi-hang-loat-bom-tan-hanh-dong-199",
                "https://momo.vn/cinema/blog/top-phim-co-doanh-thu-cao-nhat-moi-thoi-dai-415",
                "https://momo.vn/cinema/blog/phim-hay-2021-do-bo-va-hang-loat-bom-tan-xuat-sac-195",
                "https://momo.vn/cinema/blog/phim-bom-tan-2020-top-15-phim-dien-anh-dang-mong-cho-nhat-nam-84",
                "https://momo.vn/cinema/blog/nhung-bo-phim-hai-hanh-dong-man-nhan-nguoi-xem-trong-thang-2-2020-90",
                "https://momo.vn/cinema/blog/top-sieu-pham-kinh-di-dang-mong-cho-trong-mua-he-2020-132",
                "https://momo.vn/cinema/blog/danh-sach-phim-bom-tan-2020-bi-hoan-chieu-vo-thoi-han-114",
                "https://momo.vn/cinema/blog/phim-dien-anh-va-phim-truyen-hinh-khac-biet-nhau-nhu-the-nao-105",
                "https://momo.vn/cinema/blog/phim-viet-tet-2020-truong-giang-thu-trang-lan-ngoc-truc-tiep-doi-dau-cuoc-dua-phong-ve-71",
                "https://momo.vn/cinema/blog/gai-gia-lam-chieu-3-ninh-duong-lan-ngoc-doi-dau-voi-me-chong-sieu-giau-66",
                "https://momo.vn/cinema/blog/diem-mat-loat-phim-chieu-rap-tet-2020-phai-di-xem-ngay-59",
                "https://momo.vn/cinema/blog/chi-chi-em-em-toi-loi-bi-mat-va-tran-ngap-canh-bao-luc-khong-ngo-toi-41",
                "https://momo.vn/cinema/blog/ngam-dan-my-nhan-viet-sieu-xin-cong-pha-man-anh-rong-mua-cuoi-nam-39",
                "https://momo.vn/cinema/blog/top-phim-dien-anh-viet-co-kich-ban-hap-dan-nhat-nam-2019-27",
                "https://momo.vn/cinema/blog/phim-tet-2020-bom-tan-voi-su-ket-hop-truong-giang-va-mac-van-khoa-22"
        ));

        for (String url : urls) {
            crawlBlogPost(url, BlogType.PHIM_CHIEU_RAP);
        }
    }

    public void crawlBlogTongHopPhim() {
        List<String> urls = new ArrayList<>(List.of(
                "https://momo.vn/cinema/blog/top-phim-bo-han-quoc-dang-xem-nam-2023-1102",
                "https://momo.vn/cinema/blog/top-phim-ve-tri-tue-nhan-tao-dang-xem-nhat-505",
                "https://momo.vn/cinema/blog/huong-dan-xem-phim-marvel-danh-cho-nguoi-moi-bat-dau-758",
                "https://momo.vn/cinema/blog/nhung-bo-phim-kinh-dien-khong-the-bo-qua-1030",
                "https://momo.vn/cinema/blog/top-anime-sieu-nhien-nhat-dinh-phai-xem-474",
                "https://momo.vn/cinema/blog/phim-han-quoc-2022-hap-dan-468",
                "https://momo.vn/cinema/blog/top-phim-xa-hoi-den-thai-lan-772",
                "https://momo.vn/cinema/blog/nhung-tac-pham-dien-anh-ve-la-ma-co-dai-khong-the-bo-lo-771",
                "https://momo.vn/cinema/blog/top-phim-ve-sat-nhan-hang-loat-khien-ban-rung-ron-497",
                "https://momo.vn/cinema/blog/top-phim-hay-nhat-cua-stephen-king-ban-nen-xem-ngay-496",
                "https://momo.vn/cinema/blog/top-phim-tvb-cung-dau-gay-can-tren-man-anh-485",
                "https://momo.vn/cinema/blog/nhung-bo-phim-hay-nhat-cua-chung-tu-don-482",
                "https://momo.vn/cinema/blog/nhung-bo-phim-ve-quy-satan-nhat-dinh-phai-xem-483",
                "https://momo.vn/cinema/blog/top-phim-trinh-tham-nhat-ban-loi-cuon-nhat-478",
                "https://momo.vn/cinema/blog/top-phim-trung-quoc-2022-dang-hua-hen-nhat-hien-nay-477",
                "https://momo.vn/cinema/blog/nhung-bo-phim-chu-de-tro-choi-dinh-cao-476",
                "https://momo.vn/cinema/blog/nhung-bo-phim-phap-hay-va-xuat-sac-nhat-473",
                "https://momo.vn/cinema/blog/top-phim-trinh-tham-tay-ban-nha-gay-can-tot-cung-471",
                "https://momo.vn/cinema/blog/top-phim-dien-anh-co-plottwist-khet-let-470",
                "https://momo.vn/cinema/blog/nhung-bo-phim-ve-ca-sau-dang-so-nhat-tren-man-anh-463",
                "https://momo.vn/cinema/blog/nhung-bo-phim-mao-danh-nhat-dinh-phai-xem-458",
                "https://momo.vn/cinema/blog/top-phim-anime-hay-nhat-moi-thoi-dai-457",
                "https://momo.vn/cinema/blog/top-phim-vuot-nguc-dinh-nhat-ma-ban-phai-xem-456",
                "https://momo.vn/cinema/blog/top-4-phim-dien-anh-lang-man-dang-xem-dip-giang-sinh-14",
                "https://momo.vn/cinema/blog/nhung-bo-phim-hay-ve-noi-co-don-khien-ban-bat-khoc-439",
                "https://momo.vn/cinema/blog/nhung-bo-phim-hinh-su-tvb-hay-nhat-420",
                "https://momo.vn/cinema/blog/phim-bo-hay-dang-xem-nhat-hien-nay-412",
                "https://momo.vn/cinema/blog/top-phim-co-trang-trung-quoc-dang-xem-nhat-hien-nay-330",
                "https://momo.vn/cinema/blog/phim-le-kinh-di-hay-cua-khien-ban-son-gai-oc-391",
                "https://momo.vn/cinema/blog/top-phim-cua-ryan-reynolds-hay-nhat-388",
                "https://momo.vn/cinema/blog/top-phim-bao-thu-gay-can-nhat-dinh-phai-xem-377"
        ));

        for (String url : urls) {
            crawlBlogPost(url, BlogType.TONG_HOP_PHIM);
        }
    }

    public void crawlBlogPhimNetflix() {
        List<String> urls = new ArrayList<>(List.of(
                "https://momo.vn/cinema/blog/nhung-bo-phim-dang-hot-tren-netflix-cay-ngay-tai-nha-khong-can-di-xa-100",
                "https://momo.vn/cinema/blog/top-100-phim-hay-nhat-tren-netflix-206",
                "https://momo.vn/cinema/blog/danh-sach-phim-netflix-thang-5-201",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-6-224",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-7-255",
                "https://momo.vn/cinema/blog/loat-phim-toi-pham-hay-nhat-tren-netflix-hien-nay-219",
                "https://momo.vn/cinema/blog/loat-phim-toi-hai-hay-nhat-tren-netflix-hien-nay-225",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-8-313",
                "https://momo.vn/cinema/blog/top-phim-hoa-ngu-hay-tren-netflix-311",
                "https://momo.vn/cinema/blog/top-phim-kinh-di-kich-tinh-hay-323",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-9-357",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-10-366",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-11-405",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-1-455",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-2-469",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-4-1032",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-12-421",
                "https://momo.vn/cinema/blog/danh-sach-phim-hay-netflix-thang-3-501"
        ));

        for (String url : urls) {
            crawlBlogPost(url, BlogType.PHIM_NEFLIX);
        }
    }
}
