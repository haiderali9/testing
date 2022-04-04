import React from 'react';
import {createColumnData} from '@app/utils/helpers';
import DataTable from '../../../components/datatable/DataTable';

function AllAssignedToMeRegistrations() {
    const columns = React.useMemo(
        () => [
            {
                name: 'CNIC',
                sortable: true,
                selector: (row) => row.cnic
            },
            {
                name: 'Phone_Number',
                sortable: true,
                selector: (row) => row.phoneNumber
            },
            {
                name: 'Case Report Time',
                sortable: true,
                selector: (row) => row.caseReportTime
            },
            {
                name: 'Last Time Update',
                sortable: true,
                selector: (row) => row.lastUpdateTime
            },
            {
                name: 'Status',
                sortable: true,
                selector: (row) => (
                    <span
                        className={`text-${
                            row.status !== 'approved' ? 'danger' : 'success'
                        }`}
                    >
                        {row.status}
                    </span>
                )
            }
        ],
        []
    );

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header bg-dark pt-3">
                        <h3 className="card-title text-white">
                            All Assigned To Me
                        </h3>
                    </div>
                    <div className="card-body">
                        <DataTable
                            data={createColumnData([
                                {
                                    cnic: '1730175842903',
                                    phoneNumber: '03365839023',
                                    caseReportTime: '10 mins ago',
                                    lastUpdateTime: '2 mins ago',
                                    status: 'approved'
                                },
                                {
                                    cnic: '1730198756302',
                                    phoneNumber: '03365839023',
                                    caseReportTime: '22 mins ago',
                                    lastUpdateTime: '2 mins ago',
                                    status: 'rejected'
                                },
                                {
                                    cnic: '1730123445345',
                                    phoneNumber: '03365839023',
                                    caseReportTime: '2 mins ago',
                                    lastUpdateTime: '2 mins ago',
                                    status: 'approved'
                                },
                                {
                                    cnic: '1730134345345',
                                    phoneNumber: '03365839023',
                                    caseReportTime: '22 mins ago',
                                    lastUpdateTime: '2 mins ago',
                                    status: 'pending'
                                }
                            ])}
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
    );
}

export default AllAssignedToMeRegistrations;
