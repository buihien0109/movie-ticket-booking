import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/error-page/NotFoundPage";
import AppLayout from "./components/layout/AppLayout";
import AuthorizeRoutes from "./components/private/AuthorizeRoutes";
import PrivateRoutes from "./components/private/PrivateRoutes";
import AdditionalServiceCreate from "./pages/additional-service/additional-service-create/AdditionalServiceCreate";
import AdditionalServiceDetail from "./pages/additional-service/additional-service-detail/AdditionalServiceDetail";
import AdditionalServiceList from "./pages/additional-service/additional-service-list/AdditionalServiceList";
import BlogCreate from "./pages/blog/blog-create/BlogCreate";
import BlogDetail from "./pages/blog/blog-detail/BlogDetail";
import BlogList from "./pages/blog/blog-list/BlogList";
import OwnBlogList from "./pages/blog/own-blog/OwnBlogList";
import CinemaCreate from "./pages/cinema/cinema-create/CinemaCreate";
import CinemaDetail from "./pages/cinema/cinema-detail/CinemaDetail";
import CinemaList from "./pages/cinema/cinema-list/CinemaList";
import CountryList from "./pages/country/country-list/CountryList";
import CouponList from "./pages/coupon/CouponList";
import GenreList from "./pages/genre/genre-list/GenreList";
import Login from "./pages/login/Login";
import MovieCreate from "./pages/movie/movie-create/MovieCreate";
import MovieDetail from "./pages/movie/movie-detail/MovieDetail";
import MovieList from "./pages/movie/movie-list/MovieList";
import OrderList from "./pages/order/order-list/OrderList";
import ScheduleList from "./pages/schedule/ScheduleList";
import ShowtimesList from "./pages/showtimes/ShowtimesList";
import BasePriceList from "./pages/ticket-price/base-price/BasePriceList";
import UserCreate from "./pages/user/user-create/UserCreate";
import UserDetail from "./pages/user/user-detail/UserDetail";
import UserList from "./pages/user/user-list/UserList";
import OrderDetail from "./pages/order/order-detail/OrderDetail";
import RevenueByMovie from "./pages/dashboard/revenue-movie/RevenueByMovie";
import RevenueByCinema from "./pages/dashboard/revenue-cinema/RevenueByCinema";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import ActorList from "./pages/actor/actor-list/ActorList";
import ActorDetail from "./pages/actor/actor-detail/ActorDetail";
import ActorCreate from "./pages/actor/actor-create/ActorCreate";
import DirectorList from "./pages/director/director-list/DirectorList";
import DirectorDetail from "./pages/director/director-detail/DirectorDetail";
import DirectorCreate from "./pages/director/director-create/DirectorCreate";

function App() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<AuthorizeRoutes requireRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AppLayout />}>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route path="revenue/movie" element={<RevenueByMovie />}></Route>
                        <Route path="revenue/cinema" element={<RevenueByCinema />}></Route>
                        <Route path="blogs">
                            <Route index element={<BlogList />} />
                            <Route path="own-blogs" element={<OwnBlogList />} />
                            <Route path=":blogId/detail" element={<BlogDetail />} />
                            <Route path="create" element={<BlogCreate />} />
                        </Route>
                        <Route path="users">
                            <Route index element={<UserList />} />
                            <Route path=":userId/detail" element={<UserDetail />} />
                            <Route path="create" element={<UserCreate />} />
                        </Route>
                        <Route path="genres">
                            <Route index element={<GenreList />} />
                        </Route>
                        <Route path="countries">
                            <Route index element={<CountryList />} />
                        </Route>
                        <Route path="additional-services">
                            <Route index element={<AdditionalServiceList />} />
                            <Route path=":additionalServiceId/detail" element={<AdditionalServiceDetail />} />
                            <Route path="create" element={<AdditionalServiceCreate />} />
                        </Route>
                        <Route path="actors">
                            <Route index element={<ActorList />} />
                            <Route path=":actorId/detail" element={<ActorDetail />} />
                            <Route path="create" element={<ActorCreate />} />
                        </Route>
                        <Route path="directors">
                            <Route index element={<DirectorList />} />
                            <Route path=":directorId/detail" element={<DirectorDetail />} />
                            <Route path="create" element={<DirectorCreate />} />
                        </Route>
                        <Route path="cinemas">
                            <Route index element={<CinemaList />} />
                            <Route path=":cinemaId/detail" element={<CinemaDetail />} />
                            <Route path="create" element={<CinemaCreate />} />
                        </Route>
                        <Route path="movies">
                            <Route index element={<MovieList />} />
                            <Route path=":movieId/detail" element={<MovieDetail />} />
                            <Route path="create" element={<MovieCreate />} />
                        </Route>
                        <Route path="coupons">
                            <Route index element={<CouponList />} />
                        </Route>
                        <Route path="schedules">
                            <Route index element={<ScheduleList />} />
                        </Route>
                        <Route path="ticket-prices">
                            <Route path="base-price" element={<BasePriceList />} />
                        </Route>
                        <Route path="showtimes">
                            <Route index element={<ShowtimesList />} />
                        </Route>
                        <Route path="orders">
                            <Route index element={<OrderList />} />
                            <Route path=":orderId/detail" element={<OrderDetail />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
