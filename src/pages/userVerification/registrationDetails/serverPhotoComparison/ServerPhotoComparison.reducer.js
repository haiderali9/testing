import {createSlice} from '@reduxjs/toolkit';
import {getServerPhotos} from './ServerPhotoComparison.thunk';

const initialState = {
    error: null,
    loading: false,
    registration: null,
    serverAssets: null
};

export const serverPhotoComparisonSlice = createSlice({
    name: 'serverPhotoComparison',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getServerPhotos.pending]: (state) => {
            state.loading = true;
        },
        [getServerPhotos.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.registration = payload.finalApplication;
            state.serverAssets = payload.allAssets;
        },
        [getServerPhotos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default serverPhotoComparisonSlice.reducer;

export const {resetMessageState} = serverPhotoComparisonSlice.actions;
