import {createSlice} from '@reduxjs/toolkit';
import {blockAdmin, createAdmin, getAdmins, unBlockAdmin} from './Admin.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    admins: null
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [createAdmin.pending]: (state) => {
            state.loading = true;
        },
        [createAdmin.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'User Created Succesfully';
            }
            state.loading = false;
        },
        [createAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getAdmins.pending]: (state) => {
            state.loading = true;
        },
        [getAdmins.fulfilled]: (state, {payload}) => {
            state.admins = payload;
            state.loading = false;
        },
        [getAdmins.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [blockAdmin.pending]: (state) => {
            state.loading = true;
        },
        [blockAdmin.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'Admin Blocked Succesfully';
            }
            state.loading = false;
        },
        [blockAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [unBlockAdmin.pending]: (state) => {
            state.loading = true;
        },
        [unBlockAdmin.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'Admin Unblocked Succesfully';
            }
            state.loading = false;
        },
        [unBlockAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default adminSlice.reducer;

export const {resetMessageState} = adminSlice.actions;
