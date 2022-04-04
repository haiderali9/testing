import {createSlice} from '@reduxjs/toolkit';
import {blackListUser} from './BlackListUser.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null
};

export const BlackListUserSlice = createSlice({
    name: 'blackListUser',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [blackListUser.pending]: (state) => {
            state.loading = true;
        },
        [blackListUser.fulfilled]: (state) => {
            state.successMessage = 'User Blocked Succesfully';
            state.loading = false;
        },
        [blackListUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default BlackListUserSlice.reducer;

export const {resetMessageState} = BlackListUserSlice.actions;
