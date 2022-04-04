import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {toast} from 'react-toastify';
import {ContentHeader} from '../../../components/index';
import TextInputField from '../../../components/input/TextInputField';
import {registerRelyingParty} from '../RelyingParties.thunk';
import {schema} from './CreateParty.constant';
import {resetMessageState} from '../RelyingParties.reducer';

function CreateParty() {
    const {successMessage, error} = useSelector(
        (state) => state.relyingParties
    );
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            reset();
            dispatch(resetMessageState());
        } else {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage]);
    const onSubmit = (values) => {
        dispatch(registerRelyingParty(values));
    };
    return (
        <div>
            <ContentHeader title="Create Relying Party" />
            <section className="Main content">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row card-body">
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="RP Type"
                                    placeholder="RP Type"
                                    name="rpType"
                                    errors={errors.rpType}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Display Name"
                                    name="displayName"
                                    placeholder="Display Name"
                                    errors={errors.displayName}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Contact Person"
                                    name="contactPerson"
                                    placeholder="Contact Person"
                                    errors={errors.contactPerson}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Organization Type"
                                    placeholder="Organization Type"
                                    name="orgType"
                                    errors={errors.orgType}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Website URL"
                                    name="websiteURL"
                                    placeholder="Website URL"
                                    errors={errors.websiteURL}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="NTN"
                                    name="ntn"
                                    placeholder="National Tax Number"
                                    errors={errors.ntn}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Organization Number"
                                    placeholder="Organization Number"
                                    name="orgNum"
                                    errors={errors.orgNum}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="STRN"
                                    name="strn"
                                    placeholder="STRN"
                                    errors={errors.strn}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Full Name"
                                    name="fullName"
                                    placeholder="Full Name"
                                    errors={errors.fullName}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Office Address"
                                    name="officeAddress"
                                    placeholder="Office Address"
                                    errors={errors.officeAddress}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Office Phone Number"
                                    name="officePhoneNo"
                                    placeholder="Office Phone Number"
                                    errors={errors.officePhoneNo}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Office Email"
                                    name="officeEmail"
                                    placeholder="Office Email"
                                    errors={errors.officeEmail}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Correspondence Address"
                                    name="corrAddress"
                                    placeholder="Correspondence Address"
                                    errors={errors.corrAddress}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Contact Person Phone Number"
                                    name="contactPersonPhoneNo"
                                    placeholder="Contact Person Phone Number"
                                    errors={errors.contactPersonPhoneNo}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Short Name "
                                    name="shortName"
                                    placeholder="Short Name"
                                    errors={errors.shortName}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="Contact Person Email"
                                    name="contactPersonEmail"
                                    placeholder="Contact Person Email"
                                    errors={errors.contactPersonEmail}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 col-lg-4 col-sm-12">
                                <TextInputField
                                    label="IP Address CIDR"
                                    name="ipAddressCIDR"
                                    placeholder="IP Address CIDR"
                                    errors={errors.ipAdressCIDR}
                                    register={register}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-grid col-lg-12  ">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create Relying Party
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreateParty;
