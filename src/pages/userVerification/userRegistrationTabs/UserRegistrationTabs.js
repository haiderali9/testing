import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {SmallBox} from '@app/components/index';
import {
    getAssignedToMeRegNumber,
    getOpenAssignedNumber
} from './UserRegistration.thunk';

function UserRegistrationTabs() {
    const {search} = useLocation();
    const params = new URLSearchParams(search).get('tab');
    const {loading, assignedToMe, open, assignedToOthers} = useSelector(
        (state) => state.registrationTabs
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (!assignedToMe && !open && !assignedToOthers) {
            dispatch(getAssignedToMeRegNumber());
            dispatch(getOpenAssignedNumber());
        }
    }, [params]);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={
                            loading ? (
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                open
                            )
                        }
                        title="Open Registrations"
                        type="info"
                        icon="ion-android-people"
                        navigateTo="user-registration?tab=openregistrations"
                        linkText="More"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={
                            loading ? (
                                <div
                                    className="spinner-border text-info"
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                assignedToMe
                            )
                        }
                        title="Assigned To Me"
                        type="success"
                        navigateTo="user-registration?tab=assignedregistrations"
                        linkText="More"
                        icon="ion-pin"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={
                            loading ? (
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                assignedToOthers
                            )
                        }
                        title="Assigned To Anyone"
                        type="light"
                        navigateTo="user-registration?tab=othersassignedregistrations"
                        linkText="More"
                        icon="ion-paperclip"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={1}
                        title="All My Cases"
                        type="dark"
                        navigateTo="user-registration?tab=myregistrations"
                        linkText="More"
                        icon="ion-archive"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserRegistrationTabs;
