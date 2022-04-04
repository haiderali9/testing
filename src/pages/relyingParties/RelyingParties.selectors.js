import {partiesAdapter} from './RelyingParties.reducer';

export const {selectAll: selectParties} = partiesAdapter.getSelectors(
    (state) => state.parties
);
