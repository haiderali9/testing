import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {
    blockRelyingParty,
    getRelyingParties,
    registerRelyingParty,
    updateRelyingParty,
    getBlockedParties,
    unBlockRelyingParty
} from './RelyingParties.thunk';

export const partiesAdapter = createEntityAdapter();

const initialState = {
    error: null,
    loading: false,
    parties: null,
    successMessage: null,
    selectedRelyingParty: null
};

export const partiesSlice = createSlice({
    name: 'party',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        },
        setSelectedRp: (state, {payload}) => {
            state.selectedRelyingParty = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRelyingParties.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                }
            })
            .addCase(getRelyingParties.fulfilled, (state, {payload}) => {
                state.parties = payload;
                state.loading = false;
            })
            .addCase(getRelyingParties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getBlockedParties.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlockedParties.fulfilled, (state, {payload}) => {
                state.parties = payload;
                state.loading = false;
            })
            .addCase(getBlockedParties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(registerRelyingParty.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerRelyingParty.fulfilled, (state, {payload}) => {
                if (payload.code) {
                    state.error = payload.error.message;
                } else {
                    state.successMessage =
                        'Relying party registered successfully';
                }
                state.loading = false;
            })
            .addCase(registerRelyingParty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(blockRelyingParty.pending, (state) => {
                state.loading = true;
            })
            .addCase(blockRelyingParty.fulfilled, (state, {payload}) => {
                if (payload.code) {
                    state.error = payload.message;
                } else {
                    state.parties[payload.response.rpId] =
                        payload.response.status;
                    state.successMessage = 'Blocked Successfully';
                }
            })
            .addCase(blockRelyingParty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateRelyingParty.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRelyingParty.fulfilled, (state, {payload}) => {
                if (payload.code && payload.code !== 0) {
                    state.loading = false;
                    state.error = payload.message;
                } else {
                    state.loading = false;
                    state.successMessage = 'Relying Party updated successfully';
                }
            })
            .addCase(updateRelyingParty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(unBlockRelyingParty.pending, (state) => {
                state.loading = true;
            })
            .addCase(unBlockRelyingParty.fulfilled, (state, {payload}) => {
                if (payload.code) {
                    state.error = payload.message;
                } else {
                    state.parties[payload.response.rpId] =
                        payload.response.status;
                    state.successMessage = 'Unblocked Successfully';
                }
                state.loading = false;
            })
            .addCase(unBlockRelyingParty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
});

export default partiesSlice.reducer;

export const {resetMessageState, setSelectedRp} = partiesSlice.actions;
