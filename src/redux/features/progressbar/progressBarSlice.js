import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progress: 0,
}

export const progressBarSlice = createSlice({
    name: 'progressbar',
    initialState,
    reducers: {
        increaseProgressBy20: (state) => {
            state.progress = state.progress + 20
        },
        increaseProgressByCustom: (state, action) => {
            state.progress = state.progress + action.payload
        },
        completeProgress: (state) => {
            state.progress = 100
        },
        resetProgress: (state) => {
            state.progress = 0;
        }
    }
});

export const {
    completeProgress,
    resetProgress,
    increaseProgressBy20,
    increaseProgressByCustom,
} = progressBarSlice.actions;

export default progressBarSlice.reducer;