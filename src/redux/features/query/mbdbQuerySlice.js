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
    lastCachedRefresh: null,
}

export const mbdbQuerySlice = createSlice({
    name: 'mbdbquery',
    initialState,
    reducers: {
        updateQuery: (state, action) => {
            const newQuery = action.payload
            for (let [key, value] of Object.entries(newQuery)) {
                if (key === 'minimal' || key === 'restTime' || key === 'lastCachedRefresh') {
                    continue;
                } else {
                    state[key] = value;
                }
            }
        },

        refreshCachedResults: (state) => {
            for (let [key] of Object.entries(initialState)) {
                if (key === 'lastCachedRefresh') {
                    state[key] = new Date().toISOString();
                }
            }
        },

        resetQuery: (state) => {
            for (let [key, value] of Object.entries(initialState)) {
                if (key === 'restTime') {
                    state[key] = new Date().toISOString();
                } else {
                    state[key] = value;
                }
            }
        }

    }
});


export const {
    resetQuery, updateQuery, refreshCachedResults
} = mbdbQuerySlice.actions;

export default mbdbQuerySlice.reducer;