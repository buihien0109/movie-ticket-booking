import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genre: null,
    country: null,
    releaseYear: null,
    keyword: null,
    page: 1
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            const { key, value } = action.payload
            if (key === 'page') {
                state.page = value
            } else {
                state[key] = value
                state.page = 1
            }
        }
    },
})

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer