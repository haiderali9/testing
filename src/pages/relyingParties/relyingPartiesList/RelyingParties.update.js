import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../../../components/input/TextInputField';
import {schema, DEFAULT_VALUES} from './RelyingParties.constant';
import {updateRelyingParty} from '../RelyingParties.thunk';

function RelyingPartiesUpdate({onCloseModal}) {
    const dispatch = useDispatch();
    const {parties: relyingParties} = useSelector(
        (state) => state.relyingParties
    );
    const {search} = useLocation();
    const queryParam = new URLSearchParams(search);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isDirty},
        reset,
        getValues
    } = useForm({
        mode: 'all',
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (queryParam.has('rpId')) {
            const rpId = queryParam.get('rpId');
            const relyingPartyEdit = relyingParties[rpId];
            reset(relyingPartyEdit);
        }
    }, []);

    const onSubmit = (data) => {
        if (!isValid && isDirty) {
            return;
        }
        const payLoadObj = JSON.stringify(data);
        dispatch(updateRelyingParty(payLoadObj));
    };
    return (
        <div data-testid="jest">
            <div
                style={{display: 'block'}}
                className="modal fade show backdrop"
                data-bs-keyboard="false"
                tabIndex={-1}
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
                                Update Relying Party
                            </h5>
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none'
                                }}
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    reset(DEFAULT_VALUES);
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
                                <div className="row card-body">
                                    <div className="mb-3">
                                        <TextInputField
                                            disabled
                                            label="RP ID"
                                            placeholder="RP ID"
                                            name="rpId"
                                            errors={errors.rpId}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="RP Type*"
                                            placeholder="RP Type"
                                            name="rpType"
                                            errors={errors.rpType}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            type="text"
                                            label="Display Name*"
                                            name="displayName"
                                            placeholder="Display Name"
                                            errors={errors.displayName}
                                            register={register}
                                            className="form-control"
                                            onChange={(e) => {
                                                reset({
                                                    ...getValues(),
                                                    displayName:
                                                        e.target.value.replace(
                                                            /[^A-Za-z]/gi,
                                                            ''
                                                        )
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Contact Person*"
                                            name="contactPerson"
                                            placeholder="Contact Person"
                                            errors={errors.contactPerson}
                                            register={register}
                                            className="form-control"
                                            onChange={(e) => {
                                                reset({
                                                    ...getValues(),
                                                    contactPerson:
                                                        e.target.value.replace(
                                                            /[^A-Za-z]/gi,
                                                            ''
                                                        )
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Organization Type*"
                                            placeholder="Organization Type"
                                            name="orgType"
                                            errors={errors.orgType}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Website URL*"
                                            name="websiteURL"
                                            placeholder="Website URL"
                                            errors={errors.websiteURL}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="NTN*"
                                            name="ntn"
                                            placeholder="National Tax Number"
                                            errors={errors.ntn}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Organization Number*"
                                            placeholder="Organization Number"
                                            name="orgNum"
                                            errors={errors.orgNum}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="STRN*"
                                            name="strn"
                                            placeholder="STRN"
                                            errors={errors.strn}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Full Name*"
                                            name="fullName"
                                            placeholder="Full Name"
                                            errors={errors.fullName}
                                            register={register}
                                            className="form-control"
                                            onChange={(e) => {
                                                reset({
                                                    ...getValues(),
                                                    fullName:
                                                        e.target.value.replace(
                                                            /[^A-Za-z]/gi,
                                                            ''
                                                        )
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Office Address*"
                                            name="officeAddress"
                                            placeholder="Office Address"
                                            errors={errors.officeAddress}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Office Phone Number*"
                                            name="officePhoneNo"
                                            placeholder="Office Phone Number"
                                            errors={errors.officePhoneNo}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Office Email*"
                                            name="officeEmail"
                                            placeholder="Office Email"
                                            errors={errors.officeEmail}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Correspondence Address*"
                                            name="corrAddress"
                                            placeholder="Correspondence Address"
                                            errors={errors.corrAddress}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Contact Person Phone Number*"
                                            name="contactPersonPhoneNo"
                                            placeholder="Contact Person Phone Number"
                                            errors={errors.contactPersonPhoneNo}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Short Name*"
                                            maxLength="12"
                                            name="shortName"
                                            placeholder="Short Name"
                                            errors={errors.shortName}
                                            register={register}
                                            className="form-control"
                                            onChange={(e) => {
                                                reset({
                                                    ...getValues(),
                                                    shortName:
                                                        e.target.value.replace(
                                                            /[^A-Za-z]/gi,
                                                            ''
                                                        )
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="Contact Person Email*"
                                            name="contactPersonEmail"
                                            placeholder="Contact Person Email"
                                            errors={errors.contactPersonEmail}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextInputField
                                            label="IP Address CIDR*"
                                            name="ipAddressCIDR"
                                            placeholder="IP Address CIDR"
                                            errors={errors.ipAddressCIDR}
                                            register={register}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="d-grid col-lg-12">
                                        <button
                                            onClick={handleSubmit(onSubmit)}
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!isDirty}
                                        >
                                            Update Relying Party
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    reset(DEFAULT_VALUES);
                                    onCloseModal();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelyingPartiesUpdate;
