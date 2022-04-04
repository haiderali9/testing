import {createSlice} from '@reduxjs/toolkit';
import {login, logout, meraidLogin} from './auth.thunk';

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    token: null,
    error: null,
    currentUser: {
        email: 'mail@example.com',
        picture: null
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser: (state, {payload}) => {
            state.currentUser = payload;
        },
        resetMessage: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, {payload}) => {
            if (!payload.code) {
                localStorage.setItem('token', payload.data.token);
                state.isLoggedIn = true;
                state.token = payload.data.token;
            } else {
                state.error = payload.message;
            }
            state.isLoading = false;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        },
        [logout.pending]: (state) => {
            state.isLoading = true;
        },
        [logout.fulfilled]: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isLoggedIn = false;
            state.token = null;
            state.isLoading = false;
        },
        [logout.rejected]: (state) => {
            state.isLoading = false;
            state.error = 'Error Signing out';
        },
        [meraidLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [meraidLogin.fulfilled]: (state, {payload}) => {
            if (payload) {
                localStorage.setItem('token', payload);
                state.isLoggedIn = true;
                state.token = payload;
                state.isLoading = false;
            }
        },
        [meraidLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    }
});

export const {resetMessage, loginUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
