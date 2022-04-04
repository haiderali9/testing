import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createColumnData} from '@app/utils/helpers';
import Spinner from '@app/spinner/Spinner';

import DataTable from '../../../components/datatable/DataTable';
import {getAssignedRegistrations} from './AssignedRegistrations.thunk';

function AssignedRegistrations() {
    const {registrations, loading} = useSelector(
        (state) => state.assignedRegistration
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAssignedRegistrations());
    }, []);
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
                name: 'Assigned To',
                sortable: true,
                selector: (row) => row.csr.name
            }
        ],
        []
    );

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header bg-light pt-3">
                        <h3 className="card-title">
                            Open & Assigned To Others Registrations
                        </h3>
                        <div className="card-tools">
                            <button
                                type="button"
                                className="btn btn-tool"
                                data-widget="collapse"
                                data-toggle="tooltip"
                                title="Collapse"
                                onClick={() => {
                                    console.log('dispatching action later');
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

export default AssignedRegistrations;
