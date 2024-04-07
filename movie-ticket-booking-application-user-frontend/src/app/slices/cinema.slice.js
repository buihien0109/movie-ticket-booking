import { createSlice } from '@reduxjs/toolkit';
import { cinemaApi } from '../services/cinema.api';

const initialState = []

export const cinemaSlice = createSlice({
    name: 'cinemas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(cinemaApi.endpoints.getAllCinemas.matchFulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const { setShowtimesValue } = cinemaSlice.actions

export default cinemaSlice.reducer