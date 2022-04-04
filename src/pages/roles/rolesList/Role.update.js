import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import TextInputField from '../../../components/input/TextInputField';
import {editRole} from '../Roles.thunk';

function UpdateRole({onCloseModal}) {
    const {roles} = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const {search} = useLocation();
    const queryParam = new URLSearchParams(search);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isDirty, isValid},
        getValues
    } = useForm({
        mode: 'all'
    });

    useEffect(() => {
        if (queryParam.has('roleId')) {
            const roleId = queryParam.get('roleId');
            const role = roles.find((r) => {
                return r.roleId === roleId;
            });
            reset({
                roleName: role.roleName,
                roleDescription: role.roleDescription
            });
        }
    }, []);

    const onSubmit = (data) => {
        if (!isValid) {
            return;
        }
        const payload = {...data, roleId: queryParam.get('roleId')};
        dispatch(editRole(payload));
    };

    return (
        <div>
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
                                    reset();
                                    onCloseModal();
                                }}
                                onChange={(e) => {
                                    reset({
                                        ...getValues(),
                                        roleName: e.target.value.replace(
                                            /[^A-Za-z]/gi,
                                            ''
                                        )
                                    });
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
                                            label="Role Name*"
                                            placeholder="e.g Admin"
                                            name="roleName"
                                            errors={errors.roleName}
                                            register={register}
                                            className="form-control"
                                            onChange={(e) => {
                                                reset({
                                                    ...getValues(),
                                                    roleName:
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
                                            label="Description"
                                            placeholder="Description"
                                            name="roleDescription"
                                            errors={errors.roleDescription}
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
                                            Update Role
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {(errors.roleName || errors.permission) && (
                                <p className="error-msg">
                                    Required Fields Cannot be Empty !
                                </p>
                            )}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
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
export default UpdateRole;
