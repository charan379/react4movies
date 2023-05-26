import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: ''
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