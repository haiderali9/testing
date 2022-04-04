import {createSlice} from '@reduxjs/toolkit';
import {getRegistration, overWriteRegistration} from './NadraVerisysOCR.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    registration: null,
    manualRegistration: null,
    persistedOcrData: null
};

export const NadraVerisysOcrSlice = createSlice({
    name: 'nadraVerisysOcr',
    initialState,
    reducers: {
        setPersistedOcrData: (state, {payload}) => {
            state.persistedOcrData = payload;
        },
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getRegistration.pending]: (state) => {
            state.loading = true;
        },
        [getRegistration.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.registration = payload.registration;
            state.manualRegistration = payload.manualRegistration;
        },
        [getRegistration.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [overWriteRegistration.pending]: (state) => {
            state.loading = true;
        },
        [overWriteRegistration.fulfilled]: (state) => {
            state.loading = false;
            state.successMessage = 'Registration details updated successfully';
        },
        [overWriteRegistration.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default NadraVerisysOcrSlice.reducer;

export const {resetMessageState, setPersistedOcrData} =
    NadraVerisysOcrSlice.actions;
