import {createSlice} from '@reduxjs/toolkit';
import {getServerAssets, updateRegistration} from './ManualEntry.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    persistedFormData: null,
    serverAssets: null
};

export const ManualEntrySlice = createSlice({
    name: 'manualEntry',
    initialState,
    reducers: {
        loadFormData: (state, {payload}) => {
            state.persistedFormData = payload;
        },
        resetPersistedData: (state) => {
            state.persistedFormData = null;
        },
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [updateRegistration.pending]: (state) => {
            state.loading = true;
        },
        [updateRegistration.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.successMessage = payload;
        },
        [updateRegistration.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getServerAssets.pending]: (state) => {
            state.loading = true;
        },
        [getServerAssets.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.serverAssets = payload;
        },
        [getServerAssets.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default ManualEntrySlice.reducer;

export const {resetMessageState, loadFormData, resetPersistedData} =
    ManualEntrySlice.actions;
