import { createSlice } from '@reduxjs/toolkit';

const initialState = null

export const authModalSlice = createSlice({
    name: 'activeModal',
    initialState,
    reducers: {
        setActiveModal: (state, action) => {
            return action.payload
        }
    },
})

export const { setActiveModal } = authModalSlice.actions

export default authModalSlice.reducer