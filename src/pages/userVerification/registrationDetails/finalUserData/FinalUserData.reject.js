import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import CheckInputField from '@app/components/input/checkInputField';
import Spinner from '@app/spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserStatus} from './finalUserdata.thunk';
import {resetMessageState, setErrorMessage} from './finalUserData.reducer';
import {resetPersistedData} from '../manualEntryPage/ManualEntry.reducer';

function FinalUserDataReject({onCloseModal}) {
    const dispatch = useDispatch();
    const {loading, error, successMessage} = useSelector(
        (state) => state.finalUserData
    );
    const {search} = useLocation();
    const params = new URLSearchParams(search);

    const {register, handleSubmit} = useForm({
        mode: 'all'
    });

    const rejectUser = (data) => {
        const result = Object.values(data).includes(true);
        if (!result) {
            dispatch(setErrorMessage('Select a reason'));
            return;
        }
        const payload = {
            ...data,
            userId: params.get('id'),
            regId: params.get('regId'),
            status: 'reject'
        };
        dispatch(updateUserStatus(payload));
    };
    useEffect(() => {
        if (successMessage) {
            dispatch(resetPersistedData());
            onCloseModal();
            dispatch(resetMessageState());
        }
    }, [successMessage]);
    return (
        <div>
            <div
                className="modal fade show backdrop d-block"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-scrollable show">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                Reject User
                            </h5>
                            <button
                                className="modal-close-btn"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    onCloseModal();
                                }}
                            >
                                <i
                                    style={{color: 'black'}}
                                    className="fas fa-times fa-2x"
                                />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row card-body d-flex justify-content-center">
                                    <h6>
                                        Select A Reason For Rejecting User
                                        Registration
                                    </h6>
                                    <div className="my-3">
                                        <CheckInputField
                                            name="mugshot"
                                            register={register}
                                            label="Mugshot"
                                        />
                                    </div>
                                    <div className="my-3">
                                        <CheckInputField
                                            name="cnic"
                                            register={register}
                                            label="CNIC"
                                        />
                                    </div>
                                    <div className="my-3">
                                        <CheckInputField
                                            name="nadraVerisys"
                                            register={register}
                                            label="Nadra Verisys"
                                        />
                                    </div>
                                    <div className="my-3">
                                        <CheckInputField
                                            name="liveness"
                                            register={register}
                                            label="Liveness"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {error && (
                                <span className="text-danger">{error}</span>
                            )}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onCloseModal();
                                }}
                            >
                                Close
                            </button>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={handleSubmit(rejectUser)}
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalUserDataReject;
