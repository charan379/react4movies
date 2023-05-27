import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    genre: "",
    language: "",
    movie: 1,
    tv: 1,
    starred: 0,
    favourite: 0,
    seen: 0,
    "age.gte": 0,
    "age.lte": 26,
    country: "IN",
    sort_by: "createdAt.desc",
    limit: 20,
    pageNo: 1,
    minimal: true,
    restTime: null,
}

export const mbdbQuerySlice = createSlice({
    name: 'mbdbquery',
    initialState,
    reducers: {
        updateQuery: (state, action) => {
            const newQuery = action.payload
            for (let [key, value] of Object.entries(newQuery)) {
                state[key] = value
            }
        },

        resetQuery: (state) => {
            state = { ...initialState, restTime: new Date() }
        }

    }
});


export const {
    resetQuery, updateQuery
} = mbdbQuerySlice.actions;

export default mbdbQuerySlice.reducer;