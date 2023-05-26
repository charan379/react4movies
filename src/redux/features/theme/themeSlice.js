import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: ''
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state) => {
            switch (state.mode) {
                case 'light':
                    state.mode = 'dark';
                    break;
                case 'dark':
                    state.mode = 'light';
                    break;
                default:
                    state.mode = 'light';
                    break;
            }
        },

        setTheme: (state, action) => {
            switch (action?.payload) {
                case 'light':
                    state.mode = 'light';
                    break;

                case 'dark':
                    state.mode = 'dark';
                    break;

                default:
                    state.mode = 'light';
                    break;
            }
        }

    }
});


export const {
    switchTheme,
    setTheme
} = themeSlice.actions;

export default themeSlice.reducer;