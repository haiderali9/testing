import {useForm} from 'react-hook-form';
import React, {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '@app/spinner/Spinner';
import {getRoles} from '@app/pages/roles/Roles.thunk';
import {assignRoles, resetMessageState} from './AssignRoles.reducer';
import {getAdmins} from '../Admin.thunk';
import SelectComponent from '../../../components/select/Select';
import {ContentHeader} from '../../../components/index';

function AssignRoles() {
    const dispatch = useDispatch();
    const {admins} = useSelector((state) => state.admin);
    const {roles} = useSelector((state) => state.role);
    const {error, successMessage, loading} = useSelector(
        (state) => state.assignRole
    );
    const {
        handleSubmit,
        reset,
        control,
        formState: {isValid}
    } = useForm({
        mode: 'all'
    });

    useEffect(() => {
        dispatch(getAdmins());
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
            userId: data.user,
            roleIds: [
                ...data.roles.map((role) => {
                    return role.value;
                })
            ]
        };
        dispatch(assignRoles(payload));
        reset({});
    };
    return (
        <div className="container">
            <ContentHeader title="Assign Roles Page" />
            <section className="Main content mt-4">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">Assign Role</h3>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-4 col-sm-12">
                                {!admins ? (
                                    <SelectComponent
                                        control={control}
                                        name="user"
                                        defaultText="Loading"
                                        options={[
                                            {
                                                label: 'Loading...',
                                                isDisabled: true
                                            }
                                        ]}
                                        label="Users*"
                                    />
                                ) : (
                                    <SelectComponent
                                        control={control}
                                        name="user"
                                        defaultText="User"
                                        options={
                                            admins &&
                                            Object.values(admins).map(
                                                (user) => {
                                                    return {
                                                        label: `${user.firstName} ${user.lastName}`,
                                                        value: user.userId
                                                    };
                                                }
                                            )
                                        }
                                        label="Users*"
                                    />
                                )}
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                {!roles ? (
                                    <SelectComponent
                                        control={control}
                                        name="roles"
                                        defaultText="Loading..."
                                        options={[
                                            {
                                                label: 'Loading...',
                                                isDisabled: true
                                            }
                                        ]}
                                        label="Roles*"
                                    />
                                ) : (
                                    <SelectComponent
                                        isMulti
                                        control={control}
                                        name="roles"
                                        defaultText="Roles"
                                        options={roles.map((role) => {
                                            return {
                                                label: role.roleName,
                                                value: role.roleId
                                            };
                                        })}
                                        label="Roles*"
                                    />
                                )}
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
                                className="btn btn-primary offset-7  bg-primary"
                                disabled={!isValid}
                            >
                                Assign role
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AssignRoles;
