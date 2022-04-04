import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {ContentHeader} from '../../../components/index';
import TextInputField from '../../../components/input/TextInputField';
import SelectComponent from '../../../components/select/Select';
import {DEFAULT_VALUES, schema} from './CreateUser.constant';
import {createAdmin} from '../Admin.thunk';
import {resetMessageState} from '../Admin.reducer';
import Spinner from '../../../spinner/Spinner';

function CreateUser() {
    const {error, successMessage, loading} = useSelector(
        (state) => state.admin
    );
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isDirty, isValid},
        getValues
    } = useForm({
        mode: 'all',
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (!isValid) {
            return;
        }
        dispatch(createAdmin(data));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            reset(DEFAULT_VALUES);
        }
    }, [error, successMessage, dispatch]);
    return (
        <div>
            <ContentHeader title="Create User Admin" />
            <section className="Main content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title pt-2">Create User</h3>
                        </div>
                        <form data-testid="form">
                            <div className="row card-body">
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="User Name*"
                                        placeholder="Admin User Name"
                                        name="userName"
                                        errors={errors.userName}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                userName:
                                                    e.target.value.replace(
                                                        /[^A-Za-z]/gi,
                                                        ''
                                                    )
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        type="password"
                                        label="Password*"
                                        placeholder="Password"
                                        name="password"
                                        errors={errors.password}
                                        register={register}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="First Name*"
                                        placeholder="First Name"
                                        name="firstName"
                                        errors={errors.firstName}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                firstName:
                                                    e.target.value.replace(
                                                        /[^A-Za-z]/gi,
                                                        ''
                                                    )
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Last Name*"
                                        placeholder="Last Name"
                                        name="lastName"
                                        errors={errors.lastName}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                lastName:
                                                    e.target.value.replace(
                                                        /[^A-Za-z]/gi,
                                                        ''
                                                    )
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        maxLength="13"
                                        label="CNIC*"
                                        placeholder="CNIC"
                                        name="cnic"
                                        errors={errors.cnic}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                cnic: e.target.value.replace(
                                                    /[^0-9.]/g,
                                                    ''
                                                )
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <TextInputField
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        errors={errors.phoneNumber}
                                        register={register}
                                        className="form-control"
                                        onChange={(e) => {
                                            reset({
                                                ...getValues(),
                                                phoneNumber:
                                                    e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ''
                                                    )
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <SelectComponent
                                        control={control}
                                        name="userType"
                                        defaultText="User Type"
                                        options={[
                                            {
                                                value: 'internal',
                                                label: 'internal'
                                            },
                                            {
                                                value: 'external',
                                                label: 'External'
                                            }
                                        ]}
                                        label="User Type*"
                                        data-testid="UserType"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container">
                        <div className="row">
                            {loading ? (
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
                                    className=" col-2 offset-10 mr-6 btn btn-primary"
                                    disabled={!isDirty}
                                >
                                    Create User
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CreateUser;
