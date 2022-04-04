import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '@app/spinner/Spinner';
import DataTable from '../../../components/datatable/DataTable';
import {getAssignedToMeRegistrations} from './AssignedToMeRegistrations.thunk';
import {switchRegistrationAssignment} from '../openRegistrations/OpenRegistrations.thunk';
import {resetMessageState} from '../openRegistrations/OpenRegistrations.reducer';
import {unAssignTicket} from '../userRegistrationTabs/UserRegistrationTabs.reducer';

function AssignedToMeRegistrations() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {registrations, loading} = useSelector(
        (state) => state.assignedToMeRegistration
    );
    const {
        error: assignedReducerError,
        successMessage: assignedReducerSuccessMsg
    } = useSelector((state) => state.openRegistration);

    const viewRegistraion = (value) => {
        history.replace(
            `registration-manual-entry?id=${value.userId}&regId=${value.regId}`
        );
    };

    const unAssignRegistration = (userId, regId) => {
        const payload = {userId, regId};
        dispatch(switchRegistrationAssignment(payload));
    };
    useEffect(() => {
        dispatch(getAssignedToMeRegistrations());
    }, [assignedReducerSuccessMsg, assignedReducerError]);

    useEffect(() => {
        if (assignedReducerSuccessMsg) {
            toast.success(assignedReducerSuccessMsg);
            dispatch(unAssignTicket());
            dispatch(resetMessageState());
        }
        if (assignedReducerError) {
            toast.error(assignedReducerError);
            dispatch(resetMessageState());
        }
    }, [assignedReducerError, assignedReducerSuccessMsg]);

    const handleRowClicked = (row) => {
        viewRegistraion(row);
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
                            type="button"
                            className="btn btn-sm pr-4 pl-4 btn-primary"
                            onClick={() => {
                                viewRegistraion(row);
                            }}
                        >
                            View
                        </button>

                        <button
                            onClick={() => {
                                unAssignRegistration(row.userId, row.regId);
                            }}
                            type="button"
                            className="btn btn-sm btn-warning text-white ml-2"
                        >
                            Un-Assign
                        </button>
                    </div>
                ),
                ignoreRowClick: false,
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
                    <div className="card-header bg-success pt-3">
                        <h3 className="card-title">Open & Assigned To Me</h3>
                        <div className="card-tools">
                            <button
                                type="button"
                                className="btn btn-tool"
                                data-widget="collapse"
                                data-toggle="tooltip"
                                title="Collapse"
                                onClick={() => {
                                    dispatch(getAssignedToMeRegistrations());
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
                                data={registrations}
                                columns={columns}
                                pagination="pagination"
                                noHeader="noHeader"
                                defaultSortAsc={false}
                                defaultSortField="id"
                                highlightOnHover="highlightOnHover"
                                onRowClicked={handleRowClicked}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AssignedToMeRegistrations;
