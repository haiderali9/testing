import {createSlice} from '@reduxjs/toolkit';
import {getAssignedToMeRegistrations} from './AssignedToMeRegistrations.thunk';

const initialState = {
    error: null,
    loading: false,
    registrations: []
};

export const AssignedToMeRegistrationSlice = createSlice({
    name: 'assignedToMeRegistration',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getAssignedToMeRegistrations.pending]: (state) => {
            state.loading = true;
        },
        [getAssignedToMeRegistrations.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.registrations = payload;
        },
        [getAssignedToMeRegistrations.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default AssignedToMeRegistrationSlice.reducer;

export const {resetMessageState} = AssignedToMeRegistrationSlice.actions;
