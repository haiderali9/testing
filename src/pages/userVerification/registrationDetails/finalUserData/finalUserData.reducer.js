import {createSlice} from '@reduxjs/toolkit';
import {getServerRegistration, updateUserStatus} from './finalUserdata.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    serverRegistration: null
};

export const FinalUserDataSlice = createSlice({
    name: 'finalUserData',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setErrorMessage: (state, {payload}) => {
            state.error = payload;
        }
    },
    extraReducers: {
        [updateUserStatus.pending]: (state) => {
            state.loading = true;
        },
        [updateUserStatus.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.successMessage = payload;
        },
        [updateUserStatus.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getServerRegistration.pending]: (state) => {
            state.loading = true;
        },
        [getServerRegistration.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.serverRegistration = payload.finalApplication;
        },
        [getServerRegistration.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default FinalUserDataSlice.reducer;

export const {resetMessageState, setErrorMessage} = FinalUserDataSlice.actions;
