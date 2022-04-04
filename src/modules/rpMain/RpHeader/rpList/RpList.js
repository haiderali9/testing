import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Select from 'react-select';
import {setSelectedRp} from '@app/pages/relyingParties/RelyingParties.reducer';
import {getRelyingParties} from '@app/pages/relyingParties/RelyingParties.thunk';

function RpList() {
    const dispatch = useDispatch();
    const {loading, parties, selectedRelyingParty} = useSelector(
        (state) => state.relyingParties
    );

    const handleInputChange = (value) => {
        dispatch(setSelectedRp(value));
    };
    useEffect(() => {
        dispatch(getRelyingParties());
    }, [dispatch]);
    useEffect(() => {
        if (parties) {
            dispatch(
                setSelectedRp({
                    value: Object.values(parties)[0].rpId,
                    label: Object.values(parties)[0].fullName
                })
            );
        }
    }, [parties]);
    return (
        <div>
            <Select
                placeholder="Select a Relying Party"
                options={
                    parties &&
                    Object.values(parties).map((p) => {
                        return {
                            value: p.rpId,
                            label: p.fullName
                        };
                    })
                }
                value={selectedRelyingParty}
                isLoading={loading}
                onChange={handleInputChange}
                noOptionsMessage={() => 'No RP Found'}
            />
        </div>
    );
}
export default RpList;
