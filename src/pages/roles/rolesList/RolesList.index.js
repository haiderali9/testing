import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {toast} from 'react-toastify';
import Spinner from '../../../spinner/Spinner';
import {ContentHeader} from '../../../components/index';
import Alert from '../../../components/modal/Alert';
import {resetMessageState} from '../Roles.reducer';
import UpdateRole from './Role.update';
import {deleteRole, getRoles} from '../Roles.thunk';

const Roles = () => {
    const {loading, error, successMessage, roles} = useSelector(
        (state) => state.role
    );
    const history = useHistory();
    const dispatch = useDispatch();
    const {search} = useLocation();
    const queryParam = new URLSearchParams(search);

    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [roleId, setRoleID] = useState(null);

    const toggleDeleteModal = () => {
        setIsDeleteModalVisible((currentState) => !currentState);
    };
    const closeModalHandler = () => {
        queryParam.delete('roleId');
        history.replace({
            search: queryParam.toString()
        });
        setIsUpdateModalVisible(false);
    };

    const onSubmitEditRole = (id) => {
        history.replace(`?roleId=${id}`);
        setIsUpdateModalVisible(true);
    };
    const closeModalHanlder = () => {
        queryParam.delete('roleId');
        history.replace({
            search: queryParam.toString()
        });
        setIsUpdateModalVisible(false);
    };
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            dispatch(getRoles());
            closeModalHandler();
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
            closeModalHandler();
        }
    }, [successMessage, error]);
    useEffect(() => {
        if (queryParam.has('roleId')) {
            onSubmitEditRole(queryParam.get('roleId'));
        }
        dispatch(getRoles());
    }, []);

    const onConfirmDelete = () => {
        dispatch(deleteRole({roleId}));
        toggleDeleteModal();
    };
    const onRejectDelete = () => {
        toggleDeleteModal();
        setRoleID(null);
    };

    const renderPermisions = (role) => {
        return isEmpty(role.permissions) ? (
            <span className="badge bg-primary mt-2 pt-3 pb-3 pl-5 pr-5 ">
                No Permissions Assigned Yet
            </span>
        ) : (
            role.permissions.map((permission) => {
                return (
                    <span
                        key={role.roleId}
                        className="badge bg-secondary mt-2 ml-1 pt-2 pb-2"
                    >
                        {permission.arName}
                    </span>
                );
            })
        );
    };

    return loading ? (
        <Spinner data-testid="spinner" />
    ) : (
        <div>
            {isUpdateModalVisible && (
                <UpdateRole onCloseModal={closeModalHanlder} />
            )}
            <ContentHeader title="Roles" />
            <div className="container mt-5">
                <div className="accordion" id="accordionExample">
                    {roles ? (
                        roles.map((role) => {
                            return (
                                <>
                                    <div
                                        className="accordion-item"
                                        key={role.roleId}
                                    >
                                        <h2
                                            className="accordion-header d-flex"
                                            id={`c${role.roleId}`}
                                        >
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#c${role.roleId}`}
                                                aria-expanded="false"
                                                aria-controls={`c${role.roleId}`}
                                            >
                                                {role.roleName}
                                            </button>
                                        </h2>
                                    </div>
                                    <div
                                        id={`c${role.roleId}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={role.roleId}
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-9">
                                                    <h6>
                                                        {renderPermisions(role)}
                                                    </h6>
                                                </div>
                                                <div className="col-3 align-self-end">
                                                    <button
                                                        className="btn btn-md btn-primary"
                                                        type="button"
                                                        onClick={() => {
                                                            setIsUpdateModalVisible(
                                                                true
                                                            );
                                                            onSubmitEditRole(
                                                                role.roleId
                                                            );
                                                        }}
                                                    >
                                                        <i className="fas fa-edit pl-1" />{' '}
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-md btn-danger  ml-1"
                                                        type="button"
                                                        onClick={() => {
                                                            setIsDeleteModalVisible(
                                                                true
                                                            );
                                                            setRoleID(
                                                                role.roleId
                                                            );
                                                        }}
                                                    >
                                                        <i className="fas fa-trash pl-1" />{' '}
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                    ) : (
                        <p>No Roles Added Yet</p>
                    )}
                </div>
            </div>
            <div className="aligned-center mb-5 pb-5">
                <Alert
                    className="btn btn-danger"
                    title="Confirmation"
                    subTitle="Are you sure to want to Delete"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isDeleteModalVisible}
                    onSuccess={onConfirmDelete}
                    onCancel={onRejectDelete}
                />
            </div>
        </div>
    );
};

export default Roles;
