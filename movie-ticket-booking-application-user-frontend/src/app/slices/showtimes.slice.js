import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/functionUtils';

const initialState = {
    showdate: formatDate(new Date()),
    cinemaId: 1
}

export const showtimesSlice = createSlice({
    name: 'showtimes',
    initialState,
    reducers: {
        setShowtimesValue: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    },
})

export const { setShowtimesValue } = showtimesSlice.actions

export default showtimesSlice.reducer