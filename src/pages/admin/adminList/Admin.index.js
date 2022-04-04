import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {map} from 'lodash';
import Spinner from '../../../spinner/Spinner';
import {ContentHeader} from '../../../components/index';
import DataTable from '../../../components/datatable/DataTable';
import Alert from '../../../components/modal/Alert';
import {createColumnData} from '../../../utils/helpers';
import {blockAdmin, getAdmins, unBlockAdmin} from '../Admin.thunk';
import {resetMessageState} from '../Admin.reducer';

function Admin() {
    const [selectedRow, setSelectedRow] = useState(null);
    const {loading, admins, error, successMessage} = useSelector(
        (state) => state.admin
    );
    const dispatch = useDispatch();

    const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
    const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);

    const toggleBlockModal = () => {
        setIsBlockModalVisible((currentState) => !currentState);
    };
    const toggleUnblockModal = () => {
        setIsUnblockModalVisible((currentState) => !currentState);
    };
    useEffect(() => {
        dispatch(getAdmins());
    }, [dispatch]);
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

    const columns = React.useMemo(
        () => [
            {
                name: 'First Name',
                sortable: true,
                selector: (row) => row.firstName
            },
            {
                name: 'Last Name',
                sortable: true,
                selector: (row) => row.lastName
            },
            {
                name: 'Phone Number',
                sortable: true,
                selector: (row) => row.phoneNumber
            },

            {
                name: 'CNIC',
                sortable: true,
                selector: (row) => row.userId
            },
            {
                name: 'Status',
                sortable: true,
                selector: (row) =>
                    row.status === '1' ? (
                        <span className="text-success">Active</span>
                    ) : (
                        <span className="text-danger">Blocked</span>
                    )
            },
            {
                name: 'Roles',
                grow: 2,
                selector: (row) => row.userId,
                cell: (row) => map(row.roles, 'roleName').join(', ')
            },
            {
                name: 'Action',
                width: '200px',

                cell: (row) => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        {row.status === '1' ? (
                            <button
                                data-testid="blockButton"
                                type="button"
                                className="btn btn-sm btn-danger pl-3 pr-3"
                                data-bs-target="#staticBackdrop"
                                onClick={() => {
                                    setSelectedRow(row);
                                    toggleBlockModal();
                                }}
                            >
                                <i className="fas fa-ban" /> Block
                            </button>
                        ) : (
                            <button
                                data-testid="unblockButton"
                                type="button"
                                className="btn btn-sm  btn-primary "
                                data-bs-target="#staticBackdrop"
                                onClick={() => {
                                    setSelectedRow(row);
                                    toggleUnblockModal();
                                }}
                            >
                                <i className="fas fa-lock-open" /> Unblock
                            </button>
                        )}
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true
            }
        ],
        []
    );

    const onConfirmBlockAdmin = () => {
        dispatch(
            blockAdmin({
                userId: selectedRow.userId,
                status: 'block'
            })
        );

        toggleBlockModal();
        dispatch(getAdmins());
    };
    const onRejectBlockAdmin = () => {
        setSelectedRow(null);
        toggleBlockModal();
    };
    const onConfirmUnBlockAdmin = () => {
        dispatch(
            unBlockAdmin({
                userId: selectedRow.userId,
                status: 'unblock'
            })
        );
        toggleUnblockModal();
        dispatch(getAdmins());
    };
    const onRejectUnBlockAdmin = () => {
        setSelectedRow(null);
        toggleUnblockModal();
    };

    return loading ? (
        <Spinner data-testid="spinner" />
    ) : (
        <div>
            <ContentHeader title="User Admin's Page" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">User Aministrators</h3>
                        </div>
                        <div className="card-body" data-testid="dataTable">
                            <DataTable
                                data={createColumnData(admins)}
                                selectableRows
                                columns={columns}
                                pagination="pagination"
                                noHeader="noHeader"
                                defaultSortAsc={false}
                                defaultSortField="id"
                                highlightOnHover="highlightOnHover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="aligned-center">
                <Alert
                    data-testid="blockAlert"
                    className="btn btn-danger"
                    title="Confirmation"
                    subTitle="Are you sure to want to block"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isBlockModalVisible}
                    onSuccess={onConfirmBlockAdmin}
                    onCancel={onRejectBlockAdmin}
                />
            </div>
            <div className="aligned-center">
                <Alert
                    data-testid="unBlockAlert"
                    className="btn btn-primary"
                    title="Confirmation"
                    subTitle="Are you sure to want to unblock"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isUnblockModalVisible}
                    onSuccess={onConfirmUnBlockAdmin}
                    onCancel={onRejectUnBlockAdmin}
                />
            </div>
        </div>
    );
}
export default Admin;
