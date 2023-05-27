import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: "the",
    type: "",
    year: "",
    pageNo: "",
}

export const tmdbQuerySlice = createSlice({
    name: 'tmdbquery',
    initialState,
    reducers: {
        updateQuery: (state, action) => {
            const newQuery = action.payload
            for (let [key, value] of Object.entries(newQuery)) {
                state[key] = value
            }
        },

        resetQuery: (state) => {
            state = { ...initialState }
        }

    }
});


export const {
    resetQuery, updateQuery
} = tmdbQuerySlice.actions;

export default tmdbQuerySlice.reducer;