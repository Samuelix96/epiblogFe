
import { createSlice } from '@reduxjs/toolkit';

const authGitSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, //* Dati dell'utente
        token: localStorage.getItem("token") || null, //! Token dell'utente
        isAuthenticated: false, //* Stato di autenticazione
    },
    reducers: {
        loginSuccess: (state, action) =>
        {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        setUser: (state, action) =>
        {
            state.user = action.payload;
        },
        logout: (state) =>
        {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
});

export const { loginSuccess, setUser, logout } = authGitSlice.actions;
export default authGitSlice.reducer;
