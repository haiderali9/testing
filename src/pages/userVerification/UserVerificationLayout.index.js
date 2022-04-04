import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import AllAssignedToMeRegistrations from './allAssignedToMeRegistrations/AllAssignedToMeRegistrations.index';
import AssignedRegistrations from './assignedRegistrations/AssignedRegistrations.index';
import AssignedToMeRegistrations from './assignedToMeRegistrations/AssignedToMeRegistrations.index';
import OpenRegistrations from './openRegistrations/OpenRegistrations.index';
import UserRegistrationTabs from './userRegistrationTabs/UserRegistrationTabs';

function UserVerificationLayout() {
    const {search} = useLocation();
    const params = new URLSearchParams(search).get('tab');
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if (params) {
            if (params === 'openregistrations') {
                setComponent(<OpenRegistrations />);
            }
            if (params === 'assignedregistrations') {
                setComponent(<AssignedToMeRegistrations />);
            }
            if (params === 'othersassignedregistrations') {
                setComponent(<AssignedRegistrations />);
            }
            if (params === 'myregistrations') {
                setComponent(<AllAssignedToMeRegistrations />);
            }
        }
    }, [params]);
    return (
        <>
            <UserRegistrationTabs />
            {component && <div className="pt-5 mt-3">{component}</div>}
        </>
    );
}

export default UserVerificationLayout;
