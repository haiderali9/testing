import React, {useEffect} from 'react';
import Spinner from '@app/spinner/Spinner';
import {ContentHeader} from '@app/components/index';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getServerAssets} from './LivenessTest.thunk';

function LivenessTest() {
    const {mugshot, livenessVideo, loading} = useSelector(
        (state) => state.livenessTest
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const {search} = useLocation();
    const params = new URLSearchParams(search);

    const next = () => {
        history.replace(
            `registration-final-userinfo?id=${params.get(
                'id'
            )}&regId=${params.get('regId')}`
        );
    };

    useEffect(() => {
        const payload = {
            userId: params.get('id'),
            regId: params.get('regId')
        };
        dispatch(getServerAssets(payload));
    }, [dispatch]);

    return (
        <>
            <ContentHeader title="Liveness Test" />
            <div className="content">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-5 col-lg-5 col-md-5 col-sm-12 sol-xs-12">
                            <h6>Mugshot From MeraId</h6>
                            <img
                                className="user-mugshot"
                                width="400"
                                height="480"
                                alt="mugshot"
                                src={mugshot}
                            />
                        </div>
                        <div className="col-5 col-lg-5 col-md-5 col-sm-12 sol-xs-12">
                            <h6>Liveness video</h6>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <video width="400" height="480" controls>
                                    <source src={livenessVideo} />
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
                    <div className="row mt-3 mb-2 mr-5">
                        <div className="col-11 offset-1 d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn btn-primary  pl-4 pr-4"
                                onClick={() =>
                                    history.replace(
                                        `/registration-photo-comparison?id=${params.get(
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

export default LivenessTest;
