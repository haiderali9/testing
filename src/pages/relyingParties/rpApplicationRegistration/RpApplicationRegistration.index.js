import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '@app/spinner/Spinner';
import {toast} from 'react-toastify';
import {resetMessageState} from './RpApplicationRegistration.reducer';
import {ContentHeader} from '../../../components/index';
import TextInputField from '../../../components/input/TextInputField';
import {registerApplication} from './RpApplicationRegistration.thunk';
import {getRelyingParties} from '../RelyingParties.thunk';

function RpApplicationRegistration() {
    const {successMessage, error, loading} = useSelector(
        (state) => state.registerApplication
    );
    const {selectedRelyingParty} = useSelector((state) => state.relyingParties);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: 'all'
    });
    useEffect(() => {
        dispatch(getRelyingParties());
    }, [dispatch]);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            reset({});
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);

    const onSubmit = (data) => {
        if (!selectedRelyingParty) {
            toast.error('RP Not Selected');
        }
        const payload = {...data, rpId: selectedRelyingParty.value};
        dispatch(registerApplication(payload));
    };
    return (
        <div className="container">
            <ContentHeader title="Register Applications" />
            <section className="Main content mt-4">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">
                                {selectedRelyingParty &&
                                    `${selectedRelyingParty.label} Application`}
                            </h3>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Application Name*"
                                    register={register}
                                    name="appName"
                                    className="form-control"
                                    placeholder="APPLICATION NAME"
                                    errors={errors.appName}
                                />
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Custom Name"
                                    register={register}
                                    name="customName"
                                    className="form-control"
                                    placeholder="CUSTOM NAME"
                                    required={false}
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
                            >
                                Register Application
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RpApplicationRegistration;
