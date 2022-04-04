import {ContentHeader} from '@app/components/index';
import Spinner from '@app/spinner/Spinner';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {getDocUploadData, uploadNadraVerisysFile} from './NadraVerisys.thunk';
import {resetMessageState, setImage} from './NadraVerisys.reducer';

function NadraVerisys() {
    const {loading, error, documentUploadData, successMessage, verisysImage} =
        useSelector((state) => state.nadraVerisys);
    const dispatch = useDispatch();
    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const history = useHistory();
    const [selectedImg, setSelectedImg] = useState(null);

    const next = async (data) => {
        const imgFile = data.imageObj[0];
        if (!selectedImg && !imgFile) {
            toast.error('Please select a file');
            return;
        }
        if (selectedImg && selectedImg === verisysImage && !imgFile) {
            history.replace(
                `registration-verisys-ocr?id=${params.get(
                    'id'
                )}&regId=${params.get('regId')}`
            );
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = function (e) {
            setSelectedImg(e.target.result);
            dispatch(setImage(e.target.result));
        };

        const payload = {
            ...documentUploadData,
            fields: {...documentUploadData.fields, file: imgFile}
        };
        dispatch(uploadNadraVerisysFile(payload));
    };
    const {handleSubmit, register} = useForm({});

    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId'),
            useCase: 'dashboardVerisys'
        };
        dispatch(getDocUploadData(payload));
    }, [dispatch]);
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(resetMessageState());
            history.replace(
                `registration-verisys-ocr?id=${params.get(
                    'id'
                )}&regId=${params.get('regId')}`
            );
        }
        if (error) {
            toast.error(error);
            dispatch(resetMessageState());
        }
    }, [successMessage, error]);
    useEffect(() => {
        if (verisysImage) {
            setSelectedImg(verisysImage);
        }
    }, [selectedImg]);

    return (
        <>
            <ContentHeader title="Nadra Verisys Page" />
            <section className="content mt-5 pt-4 pl-2 pr-2">
                <div className="container">
                    <div className="row pl-5 pr-5">
                        <div className="col-6">
                            <h6>Nadra Verisys</h6>
                            <iframe
                                height="100%"
                                width="100%"
                                src="https://www.nadra.gov.pk/"
                                title="Nadra Verisys"
                            />
                        </div>

                        <div className="col-6 nadra-verisys-image ">
                            <h6>Photo From Nadra Verisys</h6>
                            <div className="card">
                                <img
                                    className=""
                                    src="https://www.brandsynario.com/wp-content/uploads/2017/11/CNIC.png"
                                    alt="Nadra Verisys"
                                />
                                <div className="card__overlay">
                                    <div className="overlay__text">
                                        <p>Image from Nadra Verisys</p>
                                        <button
                                            type="button"
                                            className="overlay-button btn btn-info text-white"
                                        >
                                            Download Picture
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5">
                        <div classNameName="row">
                            <div className="col-12 d-flex justify-content-start">
                                <div className="Upload pl-4">
                                    {loading && !error ? (
                                        <Spinner />
                                    ) : (
                                        <label
                                            className="btn btn-primary"
                                            htmlFor="file"
                                        >
                                            Upload File
                                            <input
                                                disabled={error}
                                                {...register('imageObj', {
                                                    required: false
                                                })}
                                                className="d-none"
                                                type="file"
                                                title="Upload"
                                                id="file"
                                            />
                                        </label>
                                    )}

                                    {error && (
                                        <p className="text-danger">{error} !</p>
                                    )}
                                </div>
                                {selectedImg && (
                                    <img
                                        className="ml-4 img-thumbnail"
                                        src={selectedImg}
                                        alt="selected"
                                        width="120"
                                        height="100"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row ml-5">
                        <div className="col-11">
                            <div className="pr-3 mt-5 pt-5 d-flex justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-primary mb-2 pl-4 pr-4"
                                    onClick={() => history.goBack()}
                                >
                                    <i className="fa fa-arrow-left" /> Back
                                </button>
                                <button
                                    onClick={handleSubmit(next)}
                                    type="button"
                                    className="btn btn-success pl-5 pr-5 mb-2"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NadraVerisys;
