# Ứng dụng Đặt Vé Xem Phim Trực Tuyến

Trang web demo, mang tính chất học tập, không dành cho mục đích thương mại.

Giao diện người dùng tham khảo từ [MoMo Cinema](https://momo.vn/cinema).

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Demo](#demo)
3. [Tính năng](#tính-năng)
4. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
5. [Sơ đồ thiết kế cơ sở dữ liệu](#sơ-đồ-thiết-kế-cơ-sở-dữ-liệu)
6. [Triển khai ứng dụng](#triển-khai-ứng-dụng)
    - [Yêu cầu](#yêu-cầu)
    - [Cài đặt](#cài-đặt)
    - [Chạy ứng dụng trên local](#chạy-ứng-dụng-trên-local)
    - [Triển khai với Docker](#triển-khai-với-docker)
7. [Sử dụng](#sử-dụng)
8. [Liên hệ](#liên-hệ)

## Giới thiệu

Đây là một ứng dụng web để đặt vé xem phim trực tuyến.

Ứng dụng bao gồm ba phần: `user-frontend`, `admin-frontend`, và `backend`.

Ứng dụng được xây dựng bằng Java SpringBoot và React, hỗ trợ xác thực và phân quyền người dùng bằng Spring Security.

## Demo

Xem demo trực tuyến:

-   Trang người dùng: [Link demo](http://103.237.144.171:8885/)
-   Trang quản trị viên: [Link demo](http://103.237.144.171:8885/admin)

## Tính năng

### User Frontend

-   Đăng ký và đăng nhập người dùng
-   Tìm kiếm các bộ phim, phim đang chiếu, phim sắp chiếu
-   Xem thông tin chi tiết phim
-   Xem lịch chiếu theo ngày chiếu, phim, rạp phim
-   Xem và đánh giá phim
-   Đặt vé xem phim, chọn ghế ngồi, xác nhận đặt vé, thanh toán qua VNPay
-   Xem danh sách bài viết và tin tức nổi bật về phim
-   Các tính năng khác như: Thay đổi thông tin cá nhân, đổi mật khẩu, xem lịch sử đặt vé, quên mật khẩu, ...
-   ...

### Admin Frontend

-   Đăng nhập quản trị viên
-   Quản lý phim và lịch chiếu
-   Xem danh sách người dùng và lịch sử đặt vé
-   Quản lý các thông tin khác của trang web: doanh thu, báo cáo, rạp phim, phòng chiếu, khuyến mại, bài viết, ...

### Backend

-   Xử lý logic nghiệp vụ và quản lý dữ liệu
-   Cung cấp API cho frontend
-   Xác thực và phân quyền người dùng

## Công nghệ sử dụng

-   **Backend:** Java SpringBoot, Spring Security, JPA, WebSocket, ...
-   **Frontend:** React, Redux, Tailwind CSS, ...
-   **Cơ sở dữ liệu:** MySQL
-   **Công cụ xây dựng:** Maven
-   **Khác:** RESTful API, JWT, Docker, Docker Compose

## Sơ đồ thiết kế cơ sở dữ liệu

- [Sơ đồ cơ sở dữ liệu](https://dbdiagram.io/d/Movie-ticket-booking-website-65a56245ac844320aef632ee)

## Triển khai ứng dụng

### Yêu cầu

-   Java 17
-   Node.js và npm
-   Cơ sở dữ liệu MySQL
-   Docker (nếu triển khai với Docker)

### Cài đặt

**Cloning repository:**

```bash
git clone https://github.com/buihien0109/movie-ticket-booking.git
cd movie-ticket-booking
```

### Chạy ứng dụng trên local

#### Cài đặt Backend

1. Di chuyển vào thư mục `application-backend`:

    ```bash
    cd application-backend
    ```

2. Cấu hình kết nối cơ sở dữ liệu trong `src/main/resources/application.properties`:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```

3. Chạy server:

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

#### Cài đặt User Frontend

1. Di chuyển vào thư mục `application-user-frontend`:

    ```bash
    cd ../application-user-frontend
    ```

2. Cài đặt dependencies:

    ```bash
    npm install
    ```

3. Chạy server:

    ```bash
    npm run dev
    ```

#### Cài đặt Admin Frontend

1. Di chuyển vào thư mục `application-admin-frontend`:

    ```bash
    cd ../application-admin-frontend
    ```

2. Cài đặt dependencies:

    ```bash
    npm install
    ```

3. Chạy server:

    ```bash
    npm run dev
    ```

### Triển khai với Docker

Trong thư mục root của ứng dụng, sử dụng Docker Compose để triển khai ứng dụng.

Chạy các containers:

```bash
docker-compose up -d
```

## Sử dụng

1. **User Frontend:** Đăng ký người dùng mới hoặc đăng nhập với tài khoản hiện có, duyệt danh sách phim có sẵn, chọn phim và chọn lịch chiếu, đặt vé và xác nhận đặt vé của bạn, xem lịch sử đặt vé trong tài khoản của bạn.
2. **Admin Frontend:** Đăng nhập với tài khoản quản trị viên, quản lý danh sách phim và lịch chiếu, xem danh sách người dùng và lịch sử đặt vé của họ.

## Liên hệ

Email - [buivanhien19tb@gmail.com](mailto:buivanhien19tb@gmail.com)