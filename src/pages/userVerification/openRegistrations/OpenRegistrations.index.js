import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Spinner from '@app/spinner/Spinner';
import {createColumnData} from '@app/utils/helpers';
import {resetMessageState} from './OpenRegistrations.reducer';
import DataTable from '../../../components/datatable/DataTable';
import {
    getOpenRegistrations,
    switchRegistrationAssignment
} from './OpenRegistrations.thunk';
import {assignTicket} from '../userRegistrationTabs/UserRegistrationTabs.reducer';

function OpenRegistrations() {
    const dispatch = useDispatch();
    const {registrations, error, loading, successMessage} = useSelector(
        (state) => state.openRegistration
    );

    useEffect(() => {
        dispatch(getOpenRegistrations());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(assignTicket());
            dispatch(resetMessageState());
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);

    const assignRegistration = (userId, regId) => {
        const payload = {userId, regId};
        dispatch(switchRegistrationAssignment(payload));
    };

    const columns = React.useMemo(
        () => [
            {
                name: 'CNIC',
                sortable: true,
                selector: (row) => row.userId
            },
            {
                name: 'Phone_Number',
                sortable: true,
                selector: (row) => row.userPhone
            },
            {
                name: 'Case Report Time',
                sortable: true,
                selector: (row) => row.createTs
            },
            {
                name: 'Last Time Update',
                sortable: true,
                selector: (row) => row.lastAlterTs
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
                            onClick={() => {
                                assignRegistration(row.userId, row.regId);
                            }}
                            type="button"
                            className="btn btn-sm btn-info text-white"
                        >
                            Assign me
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
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header bg-primary pt-3">
                        <h3 className="card-title">Open Registrations</h3>
                        <div className="card-tools">
                            <button
                                type="button"
                                className="btn btn-tool"
                                data-widget="collapse"
                                data-toggle="tooltip"
                                title="Collapse"
                                onClick={() => {
                                    dispatch(getOpenRegistrations());
                                }}
                            >
                                <i className="ion-refresh text-light" />
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <DataTable
                                data={createColumnData(registrations)}
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
    );
}

export default OpenRegistrations;
