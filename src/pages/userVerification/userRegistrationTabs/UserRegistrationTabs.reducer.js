import {createSlice} from '@reduxjs/toolkit';
import {
    getAssignedToMeRegNumber,
    getOpenAssignedNumber
} from './UserRegistration.thunk';

const initialState = {
    loading: false,
    assignedToMe: null,
    open: null,
    assignedToOthers: null
};

export const RegistrationTabsSlice = createSlice({
    name: 'registrationTabs',
    initialState,
    reducers: {
        assignTicket: (state) => {
            state.assignedToMe += 1;
            state.open -= 1;
            state.assignedToOthers += 1;
        },
        unAssignTicket: (state) => {
            state.assignedToMe -= 1;
            state.open += 1;
            state.assignedToOthers -= 1;
        }
    },
    extraReducers: {
        [getAssignedToMeRegNumber.pending]: (state) => {
            state.loading = true;
        },
        [getAssignedToMeRegNumber.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.assignedToMe = payload;
        },
        [getAssignedToMeRegNumber.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [getOpenAssignedNumber.pending]: (state) => {
            state.loading = true;
        },
        [getOpenAssignedNumber.fulfilled]: (state, {payload}) => {
            state.loading = false;
            const openRegistrtations = payload.filter((registration) => {
                return !registration.csr.id;
            });
            state.open = openRegistrtations.length;
            const otherRegistrations = payload.filter((registration) => {
                return registration.csr.id;
            });
            state.assignedToOthers = otherRegistrations.length;
        },
        [getOpenAssignedNumber.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default RegistrationTabsSlice.reducer;
export const {assignTicket, unAssignTicket} = RegistrationTabsSlice.actions;
