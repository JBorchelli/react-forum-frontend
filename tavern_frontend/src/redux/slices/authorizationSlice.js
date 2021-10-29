import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        userAuthenticated(state, action) {
            return {
                ...state,
                jwt: action.payload
            }
        }
    }
});

export const {userAuthenticated} = authorizationSlice.actions;

export default authorizationSlice.reducer;