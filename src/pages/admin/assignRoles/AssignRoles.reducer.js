import axios from 'axios';
import {SERVER_URL} from '@app/constants/index';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const assignRoles = createAsyncThunk('ASSIGN_ROLES', async (obj) => {
    const {data} = await axios.post(`${SERVER_URL}/assignRoles`, obj);
    return data;
});

const initialState = {
    error: null,
    loading: false,
    successMessage: null
};

export const AssignRolesSlice = createSlice({
    name: 'assignRole',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [assignRoles.pending]: (state) => {
            state.loading = true;
        },
        [assignRoles.fulfilled]: (state, {payload}) => {
            if (payload.code) {
                state.error = payload.message;
            } else {
                state.successMessage = 'Roles Assigned Successfully';
            }
            state.loading = false;
        },
        [assignRoles.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default AssignRolesSlice.reducer;

export const {resetMessageState} = AssignRolesSlice.actions;
