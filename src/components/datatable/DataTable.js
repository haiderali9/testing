import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

function MyDataTable({
    pagination,
    noHeader,
    defaultSortField,
    defaultSortAsc,
    highlightOnHover,
    data,
    columns,
    onRowClicked
}) {
    return (
        <div>
            <DataTableExtensions data={data} columns={columns}>
                <DataTable
                    pagination={pagination}
                    noHeader={noHeader}
                    defaultSortField={defaultSortField}
                    defaultSortAsc={defaultSortAsc}
                    highlightOnHover={highlightOnHover}
                    onRowClicked={onRowClicked}
                />
            </DataTableExtensions>
        </div>
    );
}

export default MyDataTable;
