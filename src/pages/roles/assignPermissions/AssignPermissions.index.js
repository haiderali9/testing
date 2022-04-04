import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '@app/spinner/Spinner';
import {toast} from 'react-toastify';
import {getRoles} from '../Roles.thunk';
import {resetMessageState} from './AssignPermissions.reducer';
import SelectComponent from '../../../components/select/Select';
import {ContentHeader} from '../../../components/index';
import {assignPermissions, getPermissions} from './AssignPermissions.thunk';

function AssignPermissions() {
    const {permissions, successMessage, error, loading} = useSelector(
        (state) => state.permissions
    );
    const {roles} = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const {
        handleSubmit,
        reset,
        control,
        formState: {isValid}
    } = useForm({
        mode: 'all'
    });

    useEffect(() => {
        dispatch(getPermissions());
        dispatch(getRoles());
    }, []);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);

    const onSubmit = (data) => {
        const payload = {
            roleId: data.role,
            arIds: [
                ...data.permission.map((p) => {
                    return p.value;
                })
            ]
        };
        dispatch(assignPermissions(payload));
        reset();
    };
    return (
        <div className="container">
            <ContentHeader title="Assign Permissions Page" />
            <section className="Main content mt-4">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">Assign Permissions</h3>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-4 col-sm-12">
                                {!roles ? (
                                    <SelectComponent
                                        control={control}
                                        name="role"
                                        defaultText="role"
                                        options={[
                                            {
                                                label: 'Loading...',
                                                isDisabled: true
                                            }
                                        ]}
                                        label="Role*"
                                    />
                                ) : (
                                    <SelectComponent
                                        control={control}
                                        name="role"
                                        defaultText="role"
                                        options={roles.map((role) => {
                                            return {
                                                label: role.roleName,
                                                value: role.roleId
                                            };
                                        })}
                                        label="Role*"
                                    />
                                )}
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                {!permissions ? (
                                    <SelectComponent
                                        control={control}
                                        name="permission"
                                        defaultText="permissions"
                                        options={[
                                            {
                                                label: 'Loading....',
                                                isDisabled: true
                                            }
                                        ]}
                                        label="Permissions*"
                                    />
                                ) : (
                                    <SelectComponent
                                        isMulti
                                        control={control}
                                        name="permission"
                                        defaultText="permissions"
                                        options={permissions.map((p) => {
                                            return {
                                                label: p.name,
                                                value: p.accessRightId
                                            };
                                        })}
                                        label="Permissions*"
                                    />
                                )}
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
                                Assign Permissions
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AssignPermissions;
