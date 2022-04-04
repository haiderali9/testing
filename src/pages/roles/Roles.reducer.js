import {createSlice} from '@reduxjs/toolkit';
import {createRole, deleteRole, editRole, getRoles} from './Roles.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    roles: null
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [createRole.pending]: (state) => {
            state.loading = true;
        },
        [createRole.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.loading = false;
                state.successMessage = 'Role created successfully';
            }
        },
        [createRole.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getRoles.pending]: (state) => {
            state.loading = true;
        },
        [getRoles.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.roles = payload.data.roles;
            }
            state.loading = false;
        },
        [getRoles.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [deleteRole.pending]: (state) => {
            state.loading = true;
        },
        [deleteRole.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message || 'Error Occured Deleting Role';
            } else {
                state.successMessage = 'Role Deleted Successfully';
            }
            state.loading = false;
        },
        [deleteRole.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [editRole.pending]: (state) => {
            state.loading = true;
        },
        [editRole.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'Role Updated Successfully';
            }
            state.loading = false;
        },
        [editRole.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default roleSlice.reducer;

export const {resetMessageState} = roleSlice.actions;
