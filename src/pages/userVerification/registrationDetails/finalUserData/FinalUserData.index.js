import React, {useEffect, useState} from 'react';
import {ContentHeader} from '@app/components/index';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import ImageZoom from '@app/components/imageZoom/ImageZoom';
import {dateCnic, structureCnic, calculateDifference} from '@app/utils/helpers';
import Spinner from '@app/spinner/Spinner';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {resetMessageState} from './finalUserData.reducer';
import TextInputField from '../../../../components/input/TextInputField';
import {getServerRegistration, updateUserStatus} from './finalUserdata.thunk';
import FinalUserDataReject from './FinalUserData.reject';
import Alert from '../../../../components/modal/Alert';
import {resetPersistedData} from '../manualEntryPage/ManualEntry.reducer';

function FinalUserData() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {loading, error, successMessage, serverRegistration} = useSelector(
        (state) => state.finalUserData
    );
    const {search} = useLocation();
    const params = new URLSearchParams(search);

    const [modal, setModal] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [difference, setDifference] = useState([]);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'all'
    });

    const closeModalHandler = () => {
        setModal(false);
    };
    const rejectUser = () => {
        setModal(true);
    };
    const approveUser = (data) => {
        if (!serverRegistration?.faceIds?.mugshot) {
            setComment(data);
            setAlertVisible(true);
        } else {
            const payload = {
                ...data,
                userId: params.get('id'),
                regId: params.get('regId'),
                status: 'approve'
            };
            dispatch(updateUserStatus(payload));
        }
    };
    const onConfirmApproveUser = () => {
        const payload = {
            ...comment,
            userId: params.get('id'),
            regId: params.get('regId'),
            status: 'approve'
        };
        dispatch(updateUserStatus(payload));
        setAlertVisible(false);
    };
    const onRejectApproveUser = () => {
        setAlertVisible(false);
    };
    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getServerRegistration(payload));
    }, [dispatch]);
    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getServerRegistration(payload));
    }, [dispatch]);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            dispatch(resetPersistedData());
            history.replace('/user-registration');
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);
    useEffect(() => {
        if (serverRegistration) {
            const ocredData = Object.values(serverRegistration.cnicOcredData);
            const manualEntries = Object.values(
                serverRegistration.manualEnteredData
            );
            const diff = manualEntries.filter((v) => !ocredData.includes(v));
            setDifference(diff);
        }
    }, [serverRegistration]);

    return (
        <>
            <ContentHeader title="User Data" />
            <div className="content">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-12 col-lg-12 col-xs-12 col-sm-12">
                            <div className="card w-100 h-100">
                                <div className="card-header bg-primary pt-3 pl-4 pr-4">
                                    <h6 className="card-title">User Data</h6>
                                </div>
                                <div className="card-body">
                                    {!serverRegistration && loading ? (
                                        <Spinner />
                                    ) : (
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="column"> </th>
                                                    <th scope="column">
                                                        CNIC OCR
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                        >
                                                            <i className="fas fa-edit" />
                                                        </button>
                                                    </th>
                                                    <th scope="column">
                                                        Nadraverisys OCR
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                        >
                                                            <i className="fas fa-edit" />
                                                        </button>
                                                    </th>
                                                    <th scope="column d-flex justify-content-center ">
                                                        Manually Entered
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                        >
                                                            <i className="fas fa-edit" />
                                                        </button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Name</th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.fullName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.fullName
                                                        }
                                                    </td>

                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.fullName,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.fullName
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Urdu Name
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.ur_fullName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.fullName
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_fullName,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_fullName
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Father Name
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.fatherName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.fatherName
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.fatherName,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.fatherName
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Urdu Father Name
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.ur_fatherName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.fatherName
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_fatherName,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_fatherName
                                                        }

                                                        {structureCnic(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_fatherName
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">CNIC</th>
                                                    <td>
                                                        {structureCnic(
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.userId
                                                        )}
                                                    </td>
                                                    <td>
                                                        {structureCnic(
                                                            serverRegistration?.userId
                                                        )}
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.userId,
                                                            difference
                                                        )}
                                                    >
                                                        {structureCnic(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.userId
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Phone Number
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.userPhone
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.userPhone
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.userPhone,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.userPhone
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Gender</th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.gender
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.gender
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.gender,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.gender
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Date Of Birth
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.dateOfBirth
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.dateOfBirth
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.dateOfBirth,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.dateOfBirth
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        CNIC Issue Date
                                                    </th>
                                                    <td>
                                                        {dateCnic(
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.cnicIssueDate
                                                        )}
                                                    </td>
                                                    <td>
                                                        {dateCnic(
                                                            serverRegistration?.cnicIssueDate
                                                        )}
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.cnicIssueDate,
                                                            difference
                                                        )}
                                                    >
                                                        {dateCnic(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.cnicIssueDate
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Country Of Stay
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.countryOfStay
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.countryOfStay
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.countryOfStay,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.countryOfStay
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Current Address
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.currentAddress
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.currentAddress
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.currentAddress,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.currentAddress
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th scope="row">
                                                        Urdu Current Address
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.ur_currentAddress
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.ur_currentAddress
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_currentAddress,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_currentAddress
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Permanent Address
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.permanentAddress
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.permanentAddress
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.permanentAddress,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.permanentAddress
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Urdu Permanent Address
                                                    </th>
                                                    <td>
                                                        {
                                                            serverRegistration
                                                                ?.cnicOcredData
                                                                ?.ur_permanentAddress
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            serverRegistration?.ur_permanentAddress
                                                        }
                                                    </td>
                                                    <td
                                                        className={calculateDifference(
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_permanentAddress,
                                                            difference
                                                        )}
                                                    >
                                                        {
                                                            serverRegistration
                                                                ?.manualEnteredData
                                                                ?.ur_permanentAddress
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-6 col-sm-12 col-xs-12 mt-4">
                            <div className="card h-100">
                                <div className="card-header bg-primary pt-3">
                                    <div className="card-title">FACE IDs</div>
                                </div>
                                <div className="card-body">
                                    {!serverRegistration && loading ? (
                                        <Spinner />
                                    ) : (
                                        <table className="table tabe-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>CNIC + MUGSHOT</th>

                                                    <th>
                                                        NADRA VERISYS + MUGSHOT
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span
                                                            className={`text-${
                                                                serverRegistration
                                                                    ?.faceIds
                                                                    ?.mugshot
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {!serverRegistration
                                                                ?.faceIds
                                                                ?.mugshot
                                                                ? 'UNMATCHED'
                                                                : 'MATCHED'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {' '}
                                                        <span
                                                            className={`text-${
                                                                serverRegistration
                                                                    ?.faceIds
                                                                    ?.nadraVerisys
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {!serverRegistration
                                                                ?.faceIds
                                                                ?.nadraVerisys
                                                                ? 'UNMATCHED'
                                                                : 'MATCHED'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-6 col-sm-12 col-xs-12 d-flex justify-content-center mt-4">
                            <div className="card w-100 h-100">
                                <div className="card-header pt-3 bg-primary">
                                    <h6 className="card-title"> CNIC Images</h6>
                                </div>
                                <div className="card-body">
                                    <div className="cnic-images d-flex flex-column justify-content-center align-items-center">
                                        <h6 className="align-self-start">
                                            CNIC Front
                                        </h6>
                                        <ImageZoom
                                            imgSrc={
                                                serverRegistration?.assets
                                                    .cnicFront
                                            }
                                            imgDimensions={{
                                                w: '250px',
                                                h: '300px'
                                            }}
                                            zoomImgDimensions={{
                                                w: '1100px',
                                                h: '900px'
                                            }}
                                        />
                                        <h6 className="align-self-start">
                                            CNIC Back
                                        </h6>
                                        <ImageZoom
                                            imgSrc={
                                                serverRegistration?.assets
                                                    .cnicBack
                                            }
                                            imgDimensions={{
                                                w: '250px',
                                                h: '300px'
                                            }}
                                            zoomImgDimensions={{
                                                w: '1100px',
                                                h: '900px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center mt-3 mb-3">
                        <div className="col-6 col-lg-6 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center flex-column">
                            <h5>User Mugshot</h5>

                            <img
                                className="user-mugshot"
                                width="50%"
                                src={serverRegistration?.assets.mugshot}
                                alt="mugshot"
                            />
                        </div>
                        <div className="col-6 col-lg-6 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center flex-column">
                            <h5> Liveness Video</h5>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <video width="400" height="450" controls>
                                    <source
                                        src={
                                            serverRegistration?.assets?.liveness
                                        }
                                    />
                                    <track
                                        src="fgsubtitles_en.vtt"
                                        kind="captions"
                                        srcLang="en"
                                        label="English"
                                    />
                                </video>
                            )}
                        </div>
                    </div>
                    <div className="user-data-alert">
                        <Alert
                            className="btn btn-success"
                            title="Confirmation"
                            subTitle="CNIC and Mugshot does not match are you sure to want to Approve?"
                            onRejectLabel="Cancel"
                            onSuccessLabel="Approve"
                            isVisible={isAlertVisible}
                            onSuccess={onConfirmApproveUser}
                            onCancel={onRejectApproveUser}
                        />
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col-lg-8 col-md-6 col-sm-7 col-xs-12">
                            <TextInputField
                                register={register}
                                placeholder="Comments"
                                name="comments"
                                required={false}
                                className="form-control"
                                errors={errors.comments}
                            />
                        </div>
                        <div className="buttons mt-4 col-sm-4 col-lg-4 col-md-6 col-sm-5 col-xs-12">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div className={isAlertVisible ? 'd-none' : ''}>
                                    <button
                                        type="button"
                                        className="btn btn-danger pr-5 pl-5  mx-2"
                                        onClick={rejectUser}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={handleSubmit(approveUser)}
                                        type="button"
                                        className="btn btn-success pr-5 pl-5"
                                    >
                                        Approve
                                    </button>
                                </div>
                            )}
                        </div>
                        {modal && (
                            <FinalUserDataReject
                                onCloseModal={closeModalHandler}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FinalUserData;
