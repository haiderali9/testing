import React, {useEffect, useState} from 'react';
import Spinner from '@app/spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import Alert from '@app/components/modal/Alert';
import {toast} from 'react-toastify';
import {ContentHeader} from '@app/components/index';
import DataTable from '../../../components/datatable/DataTable';
import {getNominatedUsers, removeNominatedUser} from '../NominateUser.thunk';
import {resetMessageState} from '../NominateUser.reducer';

function NominatedUsers() {
    const {loading, nominatedUsers, error, successMessage} = useSelector(
        (state) => state.nominateUser
    );
    const {selectedRelyingParty} = useSelector((state) => state.relyingParties);
    const dispatch = useDispatch();
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        if (selectedRelyingParty) {
            const payload = {rpId: selectedRelyingParty.value};
            dispatch(getNominatedUsers(payload));
        }
    }, [selectedRelyingParty]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(getNominatedUsers());
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
                name: 'Status',
                sortable: true,
                selector: (row) => row.status
            },
            {
                name: 'CNIC',
                sortable: true,
                selector: (row) => row.id
            },
            {
                name: 'Name',
                sortable: true,
                selector: (row) => row.name
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
                        <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                                setAlertVisible(true);
                                setSelectedRow(row);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true
            }
        ],
        []
    );

    const onConfirmRemoveNominee = () => {
        const payload = {
            userId: selectedRow.id,
            rpId: selectedRelyingParty.value
        };
        dispatch(removeNominatedUser(payload));
        setAlertVisible(false);
    };
    const onRejectNominee = () => {
        setSelectedRow(null);
        setAlertVisible(false);
    };

    return (
        <div>
            <ContentHeader title="Nominated User's Page" />

            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">Nominated Users</h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <DataTable
                                    data={nominatedUsers}
                                    selectableRows
                                    columns={columns}
                                    pagination="pagination"
                                    noHeader="noHeader"
                                    defaultSortAsc={false}
                                    defaultSortField="id"
                                    highlightOnHover="highlightOnHover"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className="aligned-center">
                <Alert
                    className="btn btn-danger"
                    title="Confirmation"
                    subTitle="Are you sure to want to block"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isAlertVisible}
                    onSuccess={onConfirmRemoveNominee}
                    onCancel={onRejectNominee}
                />
            </div>
        </div>
    );
}

export default NominatedUsers;
