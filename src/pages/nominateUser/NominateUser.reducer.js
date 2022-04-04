import {createSlice} from '@reduxjs/toolkit';
import {
    getNominatedUsers,
    nominateUser,
    removeNominatedUser
} from './NominateUser.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    nominatedUsers: []
};

export const NominateUserSlice = createSlice({
    name: 'nominateUser',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [nominateUser.pending]: (state) => {
            state.loading = true;
        },
        [nominateUser.fulfilled]: (state) => {
            state.successMessage = 'User Nominated Successfully';
            state.loading = false;
        },
        [nominateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getNominatedUsers.pending]: (state) => {
            state.loading = true;
        },
        [getNominatedUsers.fulfilled]: (state, {payload}) => {
            state.nominatedUsers = payload;
            state.loading = false;
        },
        [getNominatedUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [removeNominatedUser.pending]: (state) => {
            state.loading = true;
        },
        [removeNominatedUser.fulfilled]: (state) => {
            state.successMessage = 'Nominee removed successfully';
            state.loading = false;
        },
        [removeNominatedUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default NominateUserSlice.reducer;

export const {resetMessageState} = NominateUserSlice.actions;
