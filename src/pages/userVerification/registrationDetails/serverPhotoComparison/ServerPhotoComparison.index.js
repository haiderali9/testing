import React, {useEffect} from 'react';
import {ContentHeader} from '@app/components/index';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getServerPhotos} from './ServerPhotoComparison.thunk';

function ServerPhotoComparison() {
    const {registration, loading} = useSelector(
        (state) => state.serverPhotoComparison
    );
    const dispatch = useDispatch();
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const history = useHistory();

    const next = () => {
        history.replace(
            `registration-liveness-test?id=${params.get(
                'id'
            )}&regId=${params.get('regId')}`
        );
    };
    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getServerPhotos(payload));
    }, [dispatch]);
    return (
        <>
            <ContentHeader title="Photo Comparison" />
            <div className="content mt-5 ">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-4 col-lg-4 col-sm-12 col-xs-12 col-md-4">
                            <h6>Mugshot From MeraId</h6>
                            <div className="image-wrapper">
                                {registration?.assets?.mugshot ? (
                                    <img
                                        width="60%"
                                        className="comparison-images"
                                        src={registration?.assets?.mugshot}
                                        alt="mugshot"
                                    />
                                ) : (
                                    <div className="card comparison-placeholders">
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <i className="fa fa-user-circle" />
                                            {loading && (
                                                <p className="card-text placeholder-glow mt-3 d-flex justify-content-center align-items-center ">
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-4 col-lg-4 col-sm-12 col-xs-12 col-md-4">
                            <h6>Photo From CNIC</h6>
                            <div className="image-wrapper">
                                {registration?.assets?.cnicPhoto ? (
                                    <img
                                        width="60%"
                                        className="comparison-images"
                                        src={registration?.assets?.cnicPhoto}
                                        alt="mugshot"
                                    />
                                ) : (
                                    <div className="card comparison-placeholders">
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <i className="fa fa-user-circle" />
                                            {loading && (
                                                <p className="card-text placeholder-glow mt-3 d-flex justify-content-center align-items-center">
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-4 col-lg-4 col-sm-12 col-xs-12 col-md-4">
                            <h6>Photo From Nadra Verisys</h6>
                            <div className="image-wrapper">
                                {registration?.assets?.nadraVerisys ? (
                                    <img
                                        width="60%"
                                        className="comparison-images"
                                        src={registration?.assets?.nadraVerisys}
                                        alt="mugshot"
                                    />
                                ) : (
                                    <div className="card comparison-placeholders">
                                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                            <i className="fa fa-user-circle" />
                                            {loading && (
                                                <p className="card-text placeholder-glow mt-3 d-flex justify-content-center align-items-center">
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                    <span className="col-3 placeholder mx-2" />
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4">
                            Mugshot + CNIC :{' '}
                            {
                                <span
                                    className={`text-${
                                        registration?.faceIds?.mugshot ===
                                        'matched'
                                            ? 'success'
                                            : 'danger'
                                    }`}
                                >
                                    {registration?.faceIds?.mugshot ===
                                    'matched'
                                        ? registration?.faceIds?.mugshot.toUpperCase()
                                        : 'NOT EVALUATED'}
                                </span>
                            }
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            Mugshot + Verisys Photo :{' '}
                            {
                                <span
                                    className={`text-${
                                        registration?.faceIds?.nadraVerisys ===
                                        'matched'
                                            ? 'success'
                                            : 'danger'
                                    }`}
                                >
                                    {registration?.faceIds?.nadraVerisys ===
                                    'matched'
                                        ? registration?.faceIds?.nadraVerisys.toUpperCase()
                                        : 'NOT EVALUATED'}
                                </span>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11 d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary  pl-4 pr-4"
                                onClick={() =>
                                    history.replace(
                                        `/registration-verisys-ocr?id=${params.get(
                                            'id'
                                        )}&regId=${params.get('regId')}`
                                    )
                                }
                            >
                                <i className="fa fa-arrow-left" /> Back
                            </button>
                            <button
                                type="button"
                                className="btn btn-success pr-5 pl-5  ml-5"
                                onClick={next}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServerPhotoComparison;
