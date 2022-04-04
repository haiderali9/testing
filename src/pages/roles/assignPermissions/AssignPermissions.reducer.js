import {createSlice} from '@reduxjs/toolkit';
import {assignPermissions, getPermissions} from './AssignPermissions.thunk';

const initialState = {
    loading: true,
    error: null,
    permissions: []
};

export const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getPermissions.pending]: (state) => {
            state.loading = true;
        },
        [getPermissions.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.permissions = payload.data;
            }
            state.loading = false;
        },
        [getPermissions.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [assignPermissions.pending]: (state) => {
            state.loading = true;
        },
        [assignPermissions.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'Permissions Assigned Successfully';
            }
            state.loading = false;
        },
        [assignPermissions.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default permissionSlice.reducer;

export const {resetMessageState} = permissionSlice.actions;
