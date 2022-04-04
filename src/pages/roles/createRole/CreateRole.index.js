import Spinner from '@app/spinner/Spinner';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {ContentHeader} from '../../../components/index';
import TextInputField from '../../../components/input/TextInputField';
import {createRole} from '../Roles.thunk';
import {DEFAULT_VALUES} from './CreateRole.constant';
import {resetMessageState} from '../Roles.reducer';

export default function CreateRole() {
    const {error, successMessage, loading} = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const {
        handleSubmit,
        reset,
        register,
        formState: {errors, isValid},
        getValues
    } = useForm({
        mode: 'all',
        defaultValues: DEFAULT_VALUES
    });
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
    const onSubmit = (data) => {
        dispatch(createRole(data));
    };
    return (
        <div>
            <ContentHeader title="Create Role Page" />
            <section className="Main content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">Create Role</h3>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-4 col-sm-12">
                                <TextInputField
                                    errors={errors.role}
                                    label="Role*"
                                    placeholder="e.g Admin"
                                    name="roleName"
                                    className="form-control"
                                    onChange={(e) => {
                                        reset({
                                            ...getValues(),
                                            roleName: e.target.value.replace(
                                                /[^A-Za-z]/gi,
                                                ''
                                            )
                                        });
                                    }}
                                    register={register}
                                />
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <TextInputField
                                    errors={errors.desc}
                                    label="Description"
                                    placeholder="Description"
                                    name="roleDescription"
                                    className="form-control"
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-3 offset-9">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button
                                onClick={handleSubmit(onSubmit)}
                                type="submit"
                                className="btn btn-primary offset-7 bg-primary"
                                disabled={!isValid}
                            >
                                Create Role
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
