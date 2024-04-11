import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notfound/NotFound";
import PrivateRoutes from "./components/private/PrivateRoutes";
import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import BlogPhimChieuRap from "./pages/blog/BlogPhimChieuRap";
import BlogPhimNetflix from "./pages/blog/BlogPhimNetflix";
import BlogTongHopPhim from "./pages/blog/BlogTongHopPhim";
import Home from "./pages/home/Home";
import MovieShow from "./pages/movie/movie-show/ MovieShow";
import MovieComingSoon from "./pages/movie/coming-soon/MovieComingSoon";
import MovieDetail from "./pages/movie/movie-detail/MovieDetail";
import MovieShowingNow from "./pages/movie/showing-now/MovieShowingNow";
import Showtimes from "./pages/movie/showtimes/Showtimes";
import PaymentResult from "./pages/payment/PaymentResult";
import MovieReview from "./pages/review/movie-review/MovieReview";
import ConfirmForgotPassword from "./pages/user/ConfirmForgotPassword";
import UserLayout from "./pages/user/UserLayout";
import History from "./pages/user/history/History";
import Password from "./pages/user/password/Password";
import Profile from "./pages/user/profile/Profile";
import ConfirmRegistration from "./pages/user/ConfirmRegistration";
import MovieReviewDetail from "./pages/review/movie-review-detail/MovieReviewDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="lich-chieu" element={<Showtimes />} />
                <Route path="phim-chieu" element={<MovieShow />} />
                <Route path="phim-dang-chieu" element={<MovieShowingNow />} />
                <Route path="phim-sap-chieu" element={<MovieComingSoon />} />
                <Route path="phim/:movieId/:movieSlug" element={<MovieDetail />} />
                <Route path="review-phim" element={<MovieReview />} />
                <Route path="review-phim/:movieId/:movieSlug" element={<MovieReviewDetail />} />
                <Route path="bai-viet">
                    <Route index element={<BlogList />} />
                    <Route path="phim-chieu-rap" element={<BlogPhimChieuRap />} />
                    <Route path="phim-netflix" element={<BlogPhimNetflix />} />
                    <Route path="tong-hop-phim" element={<BlogTongHopPhim />} />
                    <Route path=":blogId/:blogSlug" element={<BlogDetail />} />
                </Route>
                <Route path="dat-lai-mat-khau" element={<ConfirmForgotPassword />} />
                <Route path="xac-thuc-tai-khoan" element={<ConfirmRegistration />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="khach-hang" element={<UserLayout />}>
                        <Route path="thong-tin-tai-khoan" element={<Profile />} />
                        <Route path="doi-mat-khau" element={<Password />} />
                        <Route path="lich-su-mua-ve" element={<History />} />
                    </Route>
                    <Route path="thanh-toan-don-hang/:orderId" element={<PaymentResult />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;


