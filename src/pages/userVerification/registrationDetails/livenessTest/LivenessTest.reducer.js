import {createSlice} from '@reduxjs/toolkit';
import {getServerAssets} from './LivenessTest.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    mugshot: null,
    livenessVideo: null
};

export const LivenessTestSlice = createSlice({
    name: 'livenessTest',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getServerAssets.pending]: (state) => {
            state.loading = true;
        },
        [getServerAssets.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.mugshot = payload.mugshot;
            state.livenessVideo = payload.liveness;
        },
        [getServerAssets.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default LivenessTestSlice.reducer;

export const {resetMessageState} = LivenessTestSlice.actions;
