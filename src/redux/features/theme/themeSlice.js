import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state) => {
            const currentTheme = state.mode;
            if (currentTheme === 'light') {
                state.mode = 'dark';
            } else {
                state.mode = 'light'
            }
        }
    }
});


export const {
    switchTheme
} = themeSlice.actions;

export default themeSlice.reducer;