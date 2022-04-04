import React, {useEffect, useState} from 'react';
import {ContentHeader} from '@app/components/index';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useHistory, useLocation} from 'react-router-dom';
import {includes, isEqual} from 'lodash';
import Spinner from '@app/spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {getRegistration, overWriteRegistration} from './NadraVerisysOCR.thunk';
import {
    resetMessageState,
    setPersistedOcrData
} from './NadraVerisysOCR.reducer';

function NadraVerisysOcr() {
    const {
        registration,
        loading,
        manualRegistration,
        persistedOcrData,
        successMessage,
        error
    } = useSelector((state) => state.nadraVerisysOcr);
    const dispatch = useDispatch();
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const [editInput, setEditInput] = useState([]);
    const [difference, setDifference] = useState([]);
    const history = useHistory();
    const {register, reset, handleSubmit} = useForm({
        mode: 'all'
    });
    const next = (formData) => {
        if (persistedOcrData && isEqual(persistedOcrData, manualRegistration)) {
            history.replace(
                `registration-photo-comparison?id=${params.get(
                    'id'
                )}&regId=${params.get('regId')}`
            );
        } else {
            const payload = {
                ...formData,
                userId: params.get('id'),
                regId: params.get('regId')
            };
            dispatch(overWriteRegistration(payload));
            dispatch(setPersistedOcrData(formData));
        }
    };
    const onEditField = (inputName) => {
        let editInputCopy = editInput;
        if (includes(editInputCopy, inputName)) {
            editInputCopy = editInputCopy.filter((e) => e !== inputName);
        } else {
            editInputCopy.push(inputName);
        }
        setEditInput(() => [...editInputCopy]);
    };

    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getRegistration(payload));
    }, []);
    useEffect(() => {
        if (manualRegistration && !persistedOcrData) {
            reset(manualRegistration);
        } else {
            reset(persistedOcrData);
        }
        if (registration && manualRegistration) {
            const regEntries = Object.values(registration);
            const manualEntries = Object.values(manualRegistration);
            const diff = manualEntries.filter((v) => !regEntries.includes(v));
            setDifference(diff);
        }
    }, [manualRegistration, registration]);
    useEffect(() => {
        if (successMessage) {
            history.replace(
                `registration-photo-comparison?id=${params.get(
                    'id'
                )}&regId=${params.get('regId')}`
            );
            toast.success(successMessage);
            dispatch(resetMessageState());
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [(error, successMessage)]);

    return (
        <>
            <ContentHeader title="Nadra Verisys OCR" />
            <section className="content mt-5 pt-2">
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-8 col-md-8 col-sm-12 px-2">
                            <table className="table table-hover font-verisys ">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <thead>
                                            <tr>
                                                <th> </th>
                                                <th>Verisys(OCR)</th>
                                                <th> </th>
                                                <th>Manually Entered</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {registration &&
                                                Object.keys(registration)?.map(
                                                    (key) => {
                                                        return (
                                                            <tr>
                                                                <th
                                                                    scope="row"
                                                                    className={
                                                                        !registration[
                                                                            key
                                                                        ]
                                                                            ? 'text-danger'
                                                                            : 'text-dark'
                                                                    }
                                                                >
                                                                    {key}
                                                                </th>
                                                                <td>
                                                                    {
                                                                        registration[
                                                                            key
                                                                        ]
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-light"
                                                                        onClick={() => {
                                                                            onEditField(
                                                                                key
                                                                            );
                                                                        }}
                                                                    >
                                                                        <i className="far fa-edit" />
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        {...register(
                                                                            key,
                                                                            {
                                                                                required: false
                                                                            }
                                                                        )}
                                                                        className={`form-control pt-3 pb-3 text-${
                                                                            difference.length >
                                                                                1 &&
                                                                            difference.includes(
                                                                                manualRegistration[
                                                                                    key
                                                                                ]
                                                                            )
                                                                                ? 'danger'
                                                                                : 'dark'
                                                                        }`}
                                                                        disabled={
                                                                            !includes(
                                                                                editInput,
                                                                                key
                                                                            )
                                                                        }
                                                                        name={
                                                                            key
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                        <div className="col-4 col-lg-4 col-md-4 col-sm-12">
                            <h6>Nadra Verisys Image</h6>
                            <div>
                                <img
                                    width="100%"
                                    src="https://pakistancustoms.net/wp-content/uploads/2014/04/NADRA-verisys-Verification.gif"
                                    alt="Verisys"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row pb-2 pt-0  ml-2">
                        <div className="col-11 d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary  pl-4 pr-4"
                                onClick={() =>
                                    history.replace(
                                        `/registration-nadra-verisys?id=${params.get(
                                            'id'
                                        )}&regId=${params.get('regId')}`
                                    )
                                }
                            >
                                <i className="fa fa-arrow-left" /> Back
                            </button>
                            <button
                                type="button"
                                className="btn btn-success pr-5 pl-5  ml-5"
                                onClick={handleSubmit(next)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NadraVerisysOcr;
