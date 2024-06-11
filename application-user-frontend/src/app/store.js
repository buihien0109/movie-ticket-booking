import { configureStore } from "@reduxjs/toolkit";
import { additionalServiceApi } from "./services/additionalService.api";
import { auditoriumApi } from "./services/auditorium.api";
import { authApi } from "./services/auth.api";
import { blogApi } from "./services/blog.api";
import { cinemaApi } from "./services/cinema.api";
import { countryApi } from "./services/country.api";
import { genreApi } from "./services/genre.api";
import { movieApi } from "./services/movie.api";
import { reservationApi } from "./services/reservation.api";
import { reviewApi } from "./services/review.api";
import { showtimesApi } from "./services/showtimes.api";
import authReducer from "./slices/auth.slice";
import authModalReducer from "./slices/authModal.slice";
import cinemaReducer from "./slices/cinema.slice";
import searchReducer from "./slices/search.slice";
import showtimesReducer from "./slices/showtimes.slice";
import { userApi } from "./services/user.api";
import { orderApi } from "./services/order.api";
import { couponApi } from "./services/coupon.api";
import { checkStatusMiddleware } from "./middlewares/middlewares";
import { reviewPublicApi } from "./services/reviewPublic.api";
import { tokenMiddleware } from "./middlewares/tokenMiddleware";

const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer,
        [cinemaApi.reducerPath]: cinemaApi.reducer,
        [showtimesApi.reducerPath]: showtimesApi.reducer,
        [auditoriumApi.reducerPath]: auditoriumApi.reducer,
        [additionalServiceApi.reducerPath]: additionalServiceApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
        [reviewPublicApi.reducerPath]: reviewPublicApi.reducer,
        search: searchReducer,
        showtimes: showtimesReducer,
        cinemas: cinemaReducer,
        auth: authReducer,
        activeModal: authModalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            reviewApi.middleware,
            movieApi.middleware,
            countryApi.middleware,
            genreApi.middleware,
            cinemaApi.middleware,
            showtimesApi.middleware,
            auditoriumApi.middleware,
            additionalServiceApi.middleware,
            authApi.middleware,
            reservationApi.middleware,
            userApi.middleware,
            orderApi.middleware,
            couponApi.middleware,
            reviewPublicApi.middleware,
            checkStatusMiddleware,
            tokenMiddleware
        ),
});

export default store;
