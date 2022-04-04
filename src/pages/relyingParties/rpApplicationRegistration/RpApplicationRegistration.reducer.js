import {createSlice} from '@reduxjs/toolkit';
import {
    getRpApplications,
    registerApplication,
    getApplicationTokens,
    removeApplicationToken,
    generateApplicationToken,
    removeRpApplication
} from './RpApplicationRegistration.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    rpApplications: [],
    generatedToken: null,
    applicationTokens: []
};

export const RegisterApplicationSlice = createSlice({
    name: 'registerApplication',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [registerApplication.pending]: (state) => {
            state.loading = true;
        },
        [registerApplication.fulfilled]: (state) => {
            state.successMessage = 'Application registered successfully';
            state.loading = false;
        },
        [registerApplication.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getRpApplications.pending]: (state) => {
            state.loading = true;
        },
        [getRpApplications.fulfilled]: (state, {payload}) => {
            state.rpApplications = payload;
            state.loading = false;
        },
        [getRpApplications.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [removeRpApplication.pending]: (state) => {
            state.loading = true;
        },
        [removeRpApplication.fulfilled]: (state) => {
            state.successMessage = 'Application removed successfully';
            state.loading = false;
        },
        [removeRpApplication.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [generateApplicationToken.pending]: (state) => {
            state.loading = true;
        },
        [generateApplicationToken.fulfilled]: (state, {payload}) => {
            state.generatedToken = payload;
            state.loading = false;
        },
        [generateApplicationToken.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getApplicationTokens.pending]: (state) => {
            state.loading = true;
        },
        [getApplicationTokens.fulfilled]: (state, {payload}) => {
            state.applicationTokens = payload;
            state.loading = false;
        },
        [getApplicationTokens.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [removeApplicationToken.pending]: (state) => {
            state.loading = true;
        },
        [removeApplicationToken.fulfilled]: (state) => {
            state.successMessage = 'Token removed successfully';
            state.loading = false;
        },
        [removeApplicationToken.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default RegisterApplicationSlice.reducer;

export const {resetMessageState} = RegisterApplicationSlice.actions;
