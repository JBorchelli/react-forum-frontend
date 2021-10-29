import { createSlice } from '@reduxjs/toolkit';

const initialState = {darkMode: true};

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        darkModeEnabled(state, action) {
            return {
                ...state,
                darkMode: true
            }
        },
        darkModeDisabled(state, action) {
            return {
                ...state,
                darkMode: false
            }
        }
    }
});

export const {darkModeEnabled, darkModeDisabled} = preferencesSlice.actions;

export default preferencesSlice.reducer;