import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import DataTable from '../../../components/datatable/DataTable';
import {ContentHeader} from '../../../components';
import {createColumnData} from '../../../utils/helpers';
import Spinner from '../../../spinner/Spinner';
import Alert from '../../../components/modal/Alert';
import {blockRelyingParty, getRelyingParties} from '../RelyingParties.thunk';
import RelyingPartiesUpdate from './RelyingParties.update';
import {resetMessageState} from '../RelyingParties.reducer';

function RelyingParties() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {search} = useLocation();
    const queryParam = new URLSearchParams(search);
    const [modal, setModal] = useState(false);
    const {loading, parties, successMessage, error} = useSelector(
        (state) => state.relyingParties
    );
    const [selectedRow, setSelectedRow] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleModel = () => {
        setIsVisible((currentState) => !currentState);
    };
    const closeModalHandler = () => {
        queryParam.delete('rpId');
        history.replace({
            search: queryParam.toString()
        });
        setModal(false);
    };

    const onEditRp = (rpId) => {
        setModal(true);
        history.replace(`?rpId=${rpId}`);
    };
    useEffect(() => {
        if (queryParam.has('rpId')) {
            onEditRp(queryParam.get('rpId'));
        }
        dispatch(getRelyingParties());
    }, []);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            closeModalHandler();
        } else {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [dispatch, successMessage]);

    const columns = React.useMemo(
        () => [
            {
                name: 'RP ID',
                sortable: true,
                selector: (row) => row.rpId
            },
            {
                name: 'Display Name',
                sortable: true,
                selector: (row) => row.displayName
            },
            {
                name: 'Full Name',
                sortable: true,
                selector: (row) => row.fullName
            },
            {
                name: 'Short Name',
                sortable: true,
                selector: (row) => row.shortName
            },
            {
                name: 'Contact Person',
                sortable: true,
                selector: (row) => row.contactPerson
            },
            {
                name: 'Contact Person Phone',
                sortable: true,
                selector: (row) => row.contactPersonPhoneNo
            },
            {
                name: 'Contact Person Email',
                sortable: true,
                selector: (row) => row.contactPersonEmail
            },
            {
                name: 'RP Type',
                sortable: true,
                selector: (row) => row.rpType
            },
            {
                name: 'Org Type',
                sortable: true,
                selector: (row) => row.orgType
            },
            {
                name: 'Org Num',
                sortable: true,
                selector: (row) => row.orgNum
            },
            {
                name: 'STRN',
                sortable: true,
                selector: (row) => row.strn
            },
            {
                name: 'NTN',
                sortable: true,
                selector: (row) => row.ntn
            },
            {
                name: 'Office Address',
                sortable: true,
                selector: (row) => row.officeAddress
            },
            {
                name: 'Office Phone',
                sortable: true,
                selector: (row) => row.officePhoneNo
            },
            {
                name: 'Office Email',
                sortable: true,
                selector: (row) => row.officeEmail
            },
            {
                name: 'Website URL',
                sortable: true,
                selector: (row) => row.websiteURL
            },
            {
                name: 'Corr Address',
                sortable: true,
                selector: (row) => row.corrAddress
            },
            {
                name: 'IP Adress CIDR',
                sortable: true,
                selector: (row) => row.ipAddressCIDR
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
                            className="btn btn-primary"
                            onClick={() => {
                                onEditRp(row.rpId);
                            }}
                        >
                            <i className="far fa-edit pl-2" />
                            Edit
                        </button>
                        <button
                            style={{marginLeft: '10px'}}
                            type="button"
                            className="btn btn-danger"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                setSelectedRow(row);
                                toggleModel();
                            }}
                        >
                            <i className="fas fa-ban" /> Block
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

    const onConfirmBlockParty = () => {
        dispatch(
            blockRelyingParty({
                rpId: selectedRow.rpId,
                status: 'blocked'
            })
        );
        dispatch(getRelyingParties());
        toggleModel();
    };
    const onRejectBlockParty = () => {
        toggleModel();
        setSelectedRow(null);
    };
    return loading ? (
        <Spinner data-testid="spinner" />
    ) : (
        <div>
            {modal && <RelyingPartiesUpdate onCloseModal={closeModalHandler} />}
            <ContentHeader title="Relying Parties" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title pt-2">Relying Parties</h3>
                        </div>
                        <div className="card-body">
                            <DataTable
                                data={createColumnData(parties)}
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
                    className="btn btn-danger"
                    title="Confirmation"
                    subTitle="Are you sure to want to block"
                    onSuccessLabel="Yes"
                    onRejectLabel="Cancel"
                    isVisible={isVisible}
                    onSuccess={onConfirmBlockParty}
                    onCancel={onRejectBlockParty}
                />
            </div>
        </div>
    );
}

export default RelyingParties;
