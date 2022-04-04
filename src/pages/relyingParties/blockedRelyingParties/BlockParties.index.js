import React, {useEffect, useState} from 'react';
import DataTable from '@app/components/datatable/DataTable';
import {ContentHeader} from '@app/components/index';
import Spinner from '@app/spinner/Spinner';
import {createColumnData} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import Alert from '@app/components/modal/Alert';
import {toast} from 'react-toastify';
import {getBlockedParties, unBlockRelyingParty} from '../RelyingParties.thunk';
import {resetMessageState} from '../RelyingParties.reducer';

function BlockParties() {
    const dispatch = useDispatch();
    const {loading, parties, error, successMessage} = useSelector(
        (state) => state.relyingParties
    );
    const [selectedRow, setSelectedRow] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleModel = () => {
        setIsVisible((currentState) => !currentState);
    };

    useEffect(() => {
        dispatch(getBlockedParties());
    }, []);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState);
        }
    }, [successMessage]);

    const columns = [
        {
            name: 'RP ID',
            sortable: true,
            selector: 'rpId'
        },
        {
            name: 'Display Name',
            sortable: true,
            selector: 'displayName'
        },
        {
            name: 'Full Name',
            sortable: true,
            selector: 'fullName'
        },
        {
            name: 'Short Name',
            sortable: true,
            selector: 'shortName'
        },
        {
            name: 'Contact Person',
            sortable: true,
            selector: 'contactPerson'
        },
        {
            name: 'Contact Person Phone',
            sortable: true,
            selector: 'contactPersonPhoneNo'
        },
        {
            name: 'Contact Person Email',
            sortable: true,
            selector: 'contactPersonEmail'
        },
        {
            name: 'RP Type',
            sortable: true,
            selector: 'rpType'
        },
        {
            name: 'Org Type',
            sortable: true,
            selector: 'orgType'
        },
        {
            name: 'Org Num',
            sortable: true,
            selector: 'orgNum'
        },
        {
            name: 'STRN',
            sortable: true,
            selector: 'strn'
        },
        {
            name: 'NTN',
            sortable: true,
            selector: 'ntn'
        },
        {
            name: 'Office Address',
            sortable: true,
            selector: 'officeAddress'
        },
        {
            name: 'Office Phone',
            sortable: true,
            selector: 'officePhoneNo'
        },
        {
            name: 'Office Email',
            sortable: true,
            selector: 'officeEmail'
        },
        {
            name: 'Website URL',
            sortable: true,
            selector: 'websiteURL'
        },
        {
            name: 'Corr Address',
            sortable: true,
            selector: 'corrAddress'
        },
        {
            name: 'IP Adress CIDR',
            sortable: true,
            selector: 'ipAddressCIDR'
        },
        {
            name: 'Actions',
            width: '200px',
            cell: (row) => (
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                            setSelectedRow(row);
                            toggleModel();
                        }}
                    >
                        <i className="fas fa-lock-open" /> Unblock
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];
    const onConfirmUnblockParty = () => {
        dispatch(
            unBlockRelyingParty({
                rpId: selectedRow.rpId,
                status: 'active'
            })
        );
        dispatch(getBlockedParties());
        toggleModel();
    };
    const onRejectUnblockParty = () => {
        toggleModel();
        setSelectedRow(null);
    };

    return loading ? (
        <Spinner />
    ) : (
        <div>
            <ContentHeader title="Blocked Relying Parties" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title pt-2">Relying Parties</h3>
                        </div>
                        <div className="card-body">
                            <DataTable
                                data={createColumnData(parties)}
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
                    className="btn btn-primary"
                    title="Confirmation"
                    subTitle="Are you sure to want to unblock"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isVisible}
                    onSuccess={onConfirmUnblockParty}
                    onCancel={onRejectUnblockParty}
                />
            </div>
        </div>
    );
}

export default BlockParties;
