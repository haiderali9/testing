import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import Spinner from '@app/spinner/Spinner';
import DataTable from '@app/components/datatable/DataTable';
import TextInputField from '@app/components/input/TextInputField';
import Alert from '@app/components/modal/Alert';
import {ContentHeader} from '@app/components/index';
import {
    generateApplicationToken,
    getApplicationTokens,
    removeApplicationToken
} from '../RpApplicationRegistration.thunk';
import {resetMessageState} from '../RpApplicationRegistration.reducer';

function RpTokens() {
    const {search} = useLocation();
    const queryParam = new URLSearchParams(search);
    const dispatch = useDispatch();
    const {loading, successMessage, error, applicationTokens, generatedToken} =
        useSelector((state) => state.registerApplication);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const {register, handleSubmit, reset, getValues} = useForm({
        mode: 'all'
    });

    const handleChange = (e, regex) => {
        reset({
            ...getValues(),
            [e.target.name]: e.target.value.replace(regex, '')
        });
    };

    const onConfirmRemoveToken = () => {
        const payload = {
            tokenId: selectedRow.tokenId,
            appId: queryParam.get('appId'),
            rpId: queryParam.get('rpId')
        };
        dispatch(removeApplicationToken(payload));
        setAlertVisible(false);
    };
    const onRejectRemoveToken = () => {
        setAlertVisible(false);
    };
    const generateToken = (data) => {
        const payload = {
            appId: queryParam.get('appId'),
            rpId: queryParam.get('rpId'),
            tokenName: data.tokenName
        };
        dispatch(generateApplicationToken(payload));
    };
    const copyToken = (token) => {
        console.log(token);
        navigator.clipboard.writeText(token);
        toast.info('Token Copied To Clipboard!', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    };
    useEffect(() => {
        dispatch(
            getApplicationTokens({
                appId: queryParam.get('appId'),
                rpId: queryParam.get('rpId')
            })
        );
    }, [generatedToken, successMessage]);
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
                name: 'Token Id',
                sortable: true,
                selector: (row) => row.tokenId
            },
            {
                name: 'Token Name',
                sortable: true,
                selector: (row) => row.tokenName
            },
            {
                name: 'Status',
                sortable: true,
                selector: (row) =>
                    row.tokenStatus === 'Disabled' ? (
                        <i className="fa fa-times text-danger" />
                    ) : (
                        <i className="fa fa-check text-success" />
                    )
            },
            {
                name: 'Creation Date',
                sortable: true,
                selector: (row) => new Date(row.createTs).toLocaleString()
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
                        {row.tokenStatus === 'Disabled' ? (
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary pl-3 pr-3"
                                disabled
                            >
                                Removed
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-sm btn-danger pl-4 pr-4"
                                onClick={() => {
                                    setAlertVisible(true);
                                    setSelectedRow(row);
                                }}
                            >
                                Remove
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

    return (
        <>
            <ContentHeader title="Application Tokens" />
            <section className="content mt-5">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-start align-items-center">
                        <div className="col-3">
                            <TextInputField
                                register={register}
                                className="form-control"
                                name="tokenName"
                                placeholder="Token Name"
                                onChange={(e) => {
                                    handleChange(e, /[^A-Za-z ]/gi);
                                }}
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit(generateToken)}
                            >
                                Generate Token
                            </button>
                        </div>
                    </div>
                    {generatedToken && (
                        <div className="row mt-3">
                            <div className="col-4 justify-content-start align-items-center">
                                <textarea
                                    className="form-control"
                                    value={generatedToken}
                                    disabled
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        copyToken(generatedToken);
                                    }}
                                >
                                    <i className="fa fa-copy" />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="card mt-5">
                        <div className="card-header bg-primary pt-3">
                            <h3 className="card-title">
                                (
                                {queryParam.has('appName') &&
                                    queryParam.get('appName')}
                                ) Tokens
                            </h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <DataTable
                                    data={applicationTokens}
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
                        <div className="aligned-center">
                            <Alert
                                className="btn btn-danger"
                                title="Confirmation"
                                subTitle="Are you sure to want to remove Token?"
                                onSuccessLabel="Yes"
                                onRejectLabel="Cancel"
                                isVisible={isAlertVisible}
                                onSuccess={onConfirmRemoveToken}
                                onCancel={onRejectRemoveToken}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RpTokens;
