import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '@app/spinner/Spinner';
import {toast} from 'react-toastify';
import {ContentHeader} from '../../components/index';
import TextInputField from '../../components/input/TextInputField';
import {nominateUser} from './NominateUser.thunk';
import {resetMessageState} from './NominateUser.reducer';

function NominateUser() {
    const {successMessage, error, loading} = useSelector(
        (state) => state.nominateUser
    );
    const {selectedRelyingParty} = useSelector((state) => state.relyingParties);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {isValid}
    } = useForm({
        mode: 'all'
    });

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            reset();
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);

    const handleChange = (e, regex) => {
        reset({
            ...getValues(),
            [e.target.name]: e.target.value.replace(regex, '')
        });
    };

    const onSubmit = (data) => {
        if (!selectedRelyingParty) {
            toast.error('RP Not Selected');
        }
        const payload = {...data, rpId: selectedRelyingParty.value};
        dispatch(nominateUser(payload));
        reset();
    };
    return (
        <div className="container">
            <ContentHeader title="Nominate User" />
            <section className="Main content mt-4">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">Nominate User</h3>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-4 col-sm-12">
                                <TextInputField
                                    label="CNIC*"
                                    register={register}
                                    name="userId"
                                    className="form-control"
                                    maxLength="13"
                                    minLength="13"
                                    placeholder="CNIC"
                                    onChange={(e) =>
                                        handleChange(e, /[^0-9.]/g)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 offset-8">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button
                                onClick={handleSubmit(onSubmit)}
                                type="submit"
                                className="btn btn-primary offset-7 bg-primary"
                                disabled={!isValid}
                            >
                                Nominate User
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NominateUser;
