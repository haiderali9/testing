import React from 'react';
import SmallBox from '../../components/small-box/SmallBox';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={1}
                        title="Data"
                        type="info"
                        icon="ion-android-people"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={1}
                        title="Data"
                        type="success"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={1}
                        title="Data"
                        type="warning"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={1}
                        title="Data"
                        type="danger"
                        navigateTo="/"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
