import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import Alert from '@app/components/modal/Alert';
import DataTable from '@app/components/datatable/DataTable';
import {ContentHeader} from '@app/components/index';
import Spinner from '@app/spinner/Spinner';
import {resetMessageState} from '../RpApplicationRegistration.reducer';
import {
    getRpApplications,
    removeRpApplication
} from '../RpApplicationRegistration.thunk';

function RpApplications() {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const {rpApplications, loading, successMessage, error} = useSelector(
        (state) => state.registerApplication
    );
    const {selectedRelyingParty} = useSelector((state) => state.relyingParties);

    const onTokenDetails = (row) => {
        history.push(
            `rp-application-tokens?rpId=${row.rpId}&appId=${row.appId}&appName=${row.appName}`
        );
    };
    const onConfirmRemoveApp = () => {
        const payload = {appId: selectedRow.appId, rpId: selectedRow.rpId};
        dispatch(removeRpApplication(payload));
        setAlertVisible(false);
    };
    const onRejectRemoveApp = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        if (!selectedRelyingParty) {
            toast.error('RP Not Selected');
            return;
        }
        const payload = {rpId: selectedRelyingParty.value};
        dispatch(getRpApplications(payload));
    }, [selectedRelyingParty]);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            if (selectedRow) {
                dispatch(getRpApplications({rpId: selectedRow.rpId}));
            }
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);
    const columns = React.useMemo(
        () => [
            {
                name: 'App Id',
                sortable: true,
                selector: (row) => row.appId
            },
            {
                name: 'App Name',
                sortable: true,
                selector: (row) => row.appName
            },
            {
                name: 'Custom Name',
                selector: (row) => row.customName
            },
            {
                name: 'Tokens',
                sortable: true,
                selector: (row) => row.count
            },
            {
                name: 'Creation Date',
                sortable: true,
                selector: (row) => row.createTs
            },
            {
                name: 'Manage Tokens',
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
                            className="btn btn-sm btn-primary"
                            onClick={() => onTokenDetails(row)}
                        >
                            Details
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger ml-2"
                            onClick={() => {
                                setSelectedRow(row);
                                setAlertVisible(true);
                            }}
                        >
                            remove
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

    return (
        <div>
            <ContentHeader title="RP Applications" />

            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">
                                {selectedRelyingParty &&
                                    `${selectedRelyingParty.label} Applications`}
                            </h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <DataTable
                                    data={rpApplications}
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
                <div className="aligned-center">
                    <Alert
                        className="btn btn-danger"
                        title="Confirmation"
                        subTitle="Are you sure to want to remove this application?"
                        onSuccessLabel="Yes"
                        onRejectLabel="Cancel"
                        isVisible={isAlertVisible}
                        onSuccess={onConfirmRemoveApp}
                        onCancel={onRejectRemoveApp}
                    />
                </div>
            </section>
        </div>
    );
}
export default RpApplications;
