import {createSlice} from '@reduxjs/toolkit';
import {getAssignedRegistrations} from './AssignedRegistrations.thunk';

const initialState = {
    error: null,
    loading: false,
    registrations: []
};

export const AssignedRegistrationSlice = createSlice({
    name: 'assignedRegistration',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getAssignedRegistrations.pending]: (state) => {
            state.loading = true;
        },
        [getAssignedRegistrations.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.registrations = payload;
        },
        [getAssignedRegistrations.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default AssignedRegistrationSlice.reducer;

export const {resetMessageState} = AssignedRegistrationSlice.actions;
