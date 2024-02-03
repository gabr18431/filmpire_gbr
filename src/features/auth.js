import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, actin) => {
            state.user = actin.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session_id');
            localStorage.setItem('accountId', actin.payload.id)
        }
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;