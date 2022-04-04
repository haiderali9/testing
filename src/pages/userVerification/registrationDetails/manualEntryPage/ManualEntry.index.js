import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ImageZoom from '@app/components/imageZoom/ImageZoom';
import Spinner from '@app/spinner/Spinner';
import {toast} from 'react-toastify';
import countries from 'countries-list';
import {ContentHeader} from '@app/components/index';
import SelectComponent from '@app/components/select/Select';
import TextInputField from '../../../../components/input/TextInputField';
import {getServerAssets, updateRegistration} from './ManualEntry.thunk';
import {resetMessageState, loadFormData} from './ManualEntry.reducer';
import {
    DEFAULT_VALUES,
    NUMBER_REGEX,
    TEXT_REGEX,
    URDU_REGEX
} from './ManualEntry.constants';

function ManualEntry() {
    const dispatch = useDispatch();
    const {loading, error, successMessage, serverAssets, persistedFormData} =
        useSelector((state) => state.manualEntry);
    const history = useHistory();
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
        getValues
    } = useForm({
        mode: 'all',
        defaultValues: DEFAULT_VALUES
    });
    const onsubmit = (formData) => {
        dispatch(loadFormData(formData));
        if (params.has('id') && params.has('regId')) {
            const payload = {regId: params.get('regId'), ...formData};
            dispatch(updateRegistration(payload));
        }
    };
    useEffect(() => {
        if (persistedFormData) {
            reset(persistedFormData);
        }
    }, []);

    const handleChange = (e, regex) => {
        reset({
            ...getValues(),
            [e.target.name]: e.target.value.replace(regex, '')
        });
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            history.replace(
                `registration-nadra-verisys?id=${params.get(
                    'id'
                )}&regId=${params.get('regId')}`
            );
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);
    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getServerAssets(payload));
    }, []);
    return (
        <>
            <ContentHeader title="Manual Entry" />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="row">
                                <div className="cnic-images col-lg-5 col-sm-10 d-flex flex-column justify-content-center align-items-center">
                                    <div className="p-2 cnic">
                                        <h6>CNIC Front</h6>
                                        <ImageZoom
                                            imgSrc={
                                                serverAssets?.assets?.cnicFront
                                            }
                                            imgDimensions={{w: '300', h: '250'}}
                                            zoomImgDimensions={{
                                                w: '1000',
                                                h: '1200'
                                            }}
                                        />
                                    </div>
                                    <div className="p-2 cnic">
                                        <h6>CNIC Back</h6>
                                        <ImageZoom
                                            imgSrc={
                                                serverAssets?.assets?.cnicBack
                                            }
                                            imgDimensions={{w: '300', h: '250'}}
                                            zoomImgDimensions={{
                                                w: '1000',
                                                h: '1200'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="manual-entry-form col-lg-7 col-sm-10 d-flex justify-content-center align-items-center">
                                    <form className="row">
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Full Name"
                                                placeholder="Full Name"
                                                name="fullName"
                                                errors={errors.fullName}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, TEXT_REGEX);
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Full Name / پورا نام"
                                                placeholder="اردو میں پورا نام لکھیں"
                                                name="ur_fullName"
                                                errors={errors.ur_fullName}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, URDU_REGEX);
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Father Name"
                                                placeholder="Father Name"
                                                name="fatherName"
                                                errors={errors.fatherName}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, TEXT_REGEX);
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Father Name / والد کا نام"
                                                placeholder="والد کا نام"
                                                name="ur_fatherName"
                                                errors={errors.ur_fatherName}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, 'urdu');
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <SelectComponent
                                                className=""
                                                control={control}
                                                name="gender"
                                                defaultText="Gender"
                                                options={[
                                                    {
                                                        value: 'm',
                                                        label: 'Male'
                                                    },
                                                    {
                                                        value: 'f',
                                                        label: 'Female'
                                                    },
                                                    {
                                                        value: 'o',
                                                        label: 'Other'
                                                    }
                                                ]}
                                                label="Gender"
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <SelectComponent
                                                control={control}
                                                name="countryOfStay"
                                                defaultText="Country Of Stay"
                                                options={Object.keys(
                                                    countries.countries
                                                ).map((code) => {
                                                    return {
                                                        label: countries
                                                            .countries[code]
                                                            .name,
                                                        value: countries
                                                            .countries[code]
                                                            .name
                                                    };
                                                })}
                                                label="Country Of Stay"
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="CNIC Number"
                                                minLength="13"
                                                maxLength="13"
                                                placeholder="CNIC Number"
                                                name="userId"
                                                errors={errors.userId}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        NUMBER_REGEX
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Old CNIC Number"
                                                minLength="13"
                                                maxLength="13"
                                                placeholder="Old CNIC Number"
                                                name="oldCnic"
                                                errors={errors.oldCnic}
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        NUMBER_REGEX
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                label="Date Of Birth"
                                                type="date"
                                                placeholder="Birth Date"
                                                name="dob"
                                                errors={errors.dob}
                                                register={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                type="date"
                                                label="Date Of Issue"
                                                placeholder="Date Of Issue"
                                                name="dateOfIssue"
                                                errors={errors.dateOfIssue}
                                                register={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-5 col-sm-12">
                                            <TextInputField
                                                type="date"
                                                label="Date Of Expiry"
                                                placeholder="Date Of Expiry"
                                                name="dateOfExpiry"
                                                errors={errors.dateOfExpiry}
                                                register={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-10 col-sm-12">
                                            <TextInputField
                                                label="Current Address"
                                                placeholder="Current Address"
                                                name="currentAddress"
                                                errors={errors.currentAddress}
                                                register={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-10 col-sm-12">
                                            <TextInputField
                                                label="Current Address / موجودہ پتہ"
                                                placeholder="موجودہ پتہ"
                                                name="ur_currentAddress"
                                                errors={
                                                    errors.ur_currentAddress
                                                }
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, URDU_REGEX);
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-10 col-sm-12">
                                            <TextInputField
                                                label="Permanent Address"
                                                placeholder="Permanent Address"
                                                name="permanentAddress"
                                                errors={errors.permanentAddress}
                                                register={register}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-10 col-sm-12">
                                            <TextInputField
                                                label="Permanent Address / مستقل پتہ"
                                                placeholder="مستقل پتہ"
                                                name="ur_permanentAddress"
                                                errors={
                                                    errors.ur_permanentAddress
                                                }
                                                register={register}
                                                className="form-control"
                                                onChange={(e) => {
                                                    handleChange(e, URDU_REGEX);
                                                }}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-10  offset-1 mb-4 pt-5 d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                    history.replace(`/user-registration`)
                                }
                            >
                                <i className="fa fa-arrow-left" /> Back
                            </button>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <button
                                    onClick={handleSubmit(onsubmit)}
                                    type="button"
                                    className="btn btn-success pl-5 pr-5"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ManualEntry;
