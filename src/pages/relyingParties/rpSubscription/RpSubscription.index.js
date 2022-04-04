import React from 'react';
import {useForm} from 'react-hook-form';
import {ContentHeader} from '@app/components/index';
import Spinner from '../../../spinner/Spinner';
import TextInputField from '../../../components/input/TextInputField';

function RpSubscription() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
        getValues
    } = useForm({
        mode: 'all',
        defaultValues: {}
    });

    const onSubmit = () => {};
    const handleNumberChange = (e) => {
        reset({
            ...getValues(),
            [e.target.name]: e.target.value.replace(/[^0-9.]/g, '')
        });
    };

    return (
        <div>
            <ContentHeader title="RP Subscription" />
            <section className="Main content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title pt-2">Subscribe RP</h3>
                        </div>
                        <form data-testid="form">
                            <div className="row card-body">
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Auth Price"
                                        placeholder="Price"
                                        name="authPrice"
                                        errors={errors.authPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Sign Price"
                                        placeholder="Sign Price"
                                        name="signPrice"
                                        errors={errors.signPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Face Bio Price"
                                        placeholder="Facebio Price"
                                        name="faceBioPrice"
                                        errors={errors.faceBioPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Liveness Price"
                                        placeholder="Liveness Price"
                                        name="livenessPrice"
                                        errors={errors.livenessPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="On Boarding Price"
                                        placeholder="Onboarding Price"
                                        name="onBoardingPrice"
                                        errors={errors.onBoardingPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Info Sharing Price"
                                        placeholder="Info Sharing Price"
                                        name="infoSharingPrice"
                                        errors={errors.infoSharingPrice}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Auth Discount"
                                        placeholder="Auth Discount"
                                        name="authDiscount"
                                        errors={errors.authDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Sign Discount"
                                        placeholder="Sign Discount"
                                        name="signDiscount"
                                        errors={errors.signDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Face Bio Discount"
                                        placeholder="Face Bio Discount"
                                        name="faceBioDiscount"
                                        errors={errors.faceBioDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Liveness Discount"
                                        placeholder="Liveness Discount"
                                        name="livenessDiscount"
                                        errors={errors.livenessDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Info Sharing  Discount"
                                        placeholder="Info Sharing Discount"
                                        name="infoSharingDiscount"
                                        errors={errors.infoSharingDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Overall  Discount"
                                        placeholder="Overall Discount"
                                        name="overallDiscount"
                                        errors={errors.overallDiscount}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Monthly Fixed Fee"
                                        placeholder="Monthly Fee"
                                        name="monthlyFixedFee"
                                        errors={errors.monthlyFixedFee}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Start Ts "
                                        placeholder="Start Ts"
                                        name="startTs"
                                        errors={errors.startTs}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="End Ts "
                                        placeholder="End Ts"
                                        name="endTs"
                                        errors={errors.endTs}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Initial Deposite"
                                        placeholder="Initial Deposite"
                                        name="initialDeposite"
                                        errors={errors.initialDeposite}
                                        register={register}
                                        className="form-control"
                                        onChange={handleNumberChange}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Currency"
                                        placeholder="Currency"
                                        name="currency"
                                        errors={errors.currency}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                currency:
                                                    e.target.value.replace(
                                                        /[^A-Za-z]/gi,
                                                        ''
                                                    )
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container">
                        <div className="row">
                            {false ? (
                                <div
                                    className="col-2 offset-10 mr-6"
                                    data-testid="spinner"
                                >
                                    <Spinner />
                                </div>
                            ) : (
                                <button
                                    data-testid="submitButton"
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    className=" col-2 offset-10 mr-6 bg-primary btn btn-primary"
                                    disabled={!isValid}
                                >
                                    Subscribe
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RpSubscription;
