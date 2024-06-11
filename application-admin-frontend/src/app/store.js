import { configureStore } from "@reduxjs/toolkit";
import { checkStatusMiddleware } from "./middlewares/middlewares";
import { actorApi } from "./services/actors.service";
import { additionalServiceApi } from "./services/additionalServices.service";
import { auditoriumApi } from "./services/auditorium.service";
import { authApi } from "./services/auth.service";
import { baseTicketPriceApi } from "./services/baseTicketPrice.service";
import { blogApi } from "./services/blogs.service";
import { cinemaApi } from "./services/cinemas.service";
import { countryApi } from "./services/countries.service";
import { couponApi } from "./services/coupons.service";
import { dashboardApi } from "./services/dashboard.service";
import { directorApi } from "./services/directors.service";
import { genreApi } from "./services/genres.service";
import { imageApi } from "./services/images.service";
import { movieApi } from "./services/movies.service";
import { orderApi } from "./services/orders.service";
import { reviewApi } from "./services/reviews.service";
import { scheduleApi } from "./services/schedules.service";
import { seatApi } from "./services/seats.service";
import { showtimesApi } from "./services/showtimes.service";
import { userApi } from "./services/users.service";
import authReducer from "./slices/auth.slice";
import imageReducer from "./slices/image.slice";
import { tokenMiddleware } from "./middlewares/tokenMiddleware";

const store = configureStore({
    reducer: {
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [additionalServiceApi.reducerPath]: additionalServiceApi.reducer,
        [cinemaApi.reducerPath]: cinemaApi.reducer,
        [auditoriumApi.reducerPath]: auditoriumApi.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [actorApi.reducerPath]: actorApi.reducer,
        [directorApi.reducerPath]: directorApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,
        [scheduleApi.reducerPath]: scheduleApi.reducer,
        [baseTicketPriceApi.reducerPath]: baseTicketPriceApi.reducer,
        [seatApi.reducerPath]: seatApi.reducer,
        [showtimesApi.reducerPath]: showtimesApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        auth: authReducer,
        images: imageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            genreApi.middleware,
            countryApi.middleware,
            imageApi.middleware,
            authApi.middleware,
            userApi.middleware,
            dashboardApi.middleware,
            additionalServiceApi.middleware,
            cinemaApi.middleware,
            auditoriumApi.middleware,
            movieApi.middleware,
            actorApi.middleware,
            directorApi.middleware,
            reviewApi.middleware,
            couponApi.middleware,
            scheduleApi.middleware,
            baseTicketPriceApi.middleware,
            seatApi.middleware,
            showtimesApi.middleware,
            orderApi.middleware,
            checkStatusMiddleware,
            tokenMiddleware
        ),
});

export default store;
