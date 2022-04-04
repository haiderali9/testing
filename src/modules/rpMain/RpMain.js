import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSidebarMenu} from '@app/store/reducers/ui';
import Dashboard from '@pages/dashboard/Dashboard.index';
import Profile from '@pages/profile/Profile';
import NominatedUsers from '@app/pages/nominateUser/nominatedUsers/NominatedUsers.index';
import RpApplications from '@app/pages/relyingParties/rpApplicationRegistration/rpApplications/RpApplications.index';
import RpTokens from '@app/pages/relyingParties/rpApplicationRegistration/rpTokens/RpTokens.index';
import RpApplicationRegistration from '@app/pages/relyingParties/rpApplicationRegistration/RpApplicationRegistration.index';
import NominateUser from '@app/pages/nominateUser/NominateUser.index';
import Footer from '../main/footer/Footer';
import PageLoading from '../../components/page-loading/PageLoading';
import '../main/Main.css';
import RpMenuSidebar from './rpMenuSidebar/RpMenuSidebar';
import RpHeader from './RpHeader/RpHeader';

const RpMain = () => {
    const pathName = '/rp-main';

    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const {isLoggedIn} = useSelector((state) => state.auth);
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const fetchProfile = async () => {
        setIsAppLoaded(true);
    };
    useEffect(() => {
        if (isLoggedIn) {
            fetchProfile();
        }
    }, [isLoggedIn]);
    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarMenuCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarMenuCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }

        return (
            <>
                <RpHeader toggleMenuSidebar={handleToggleMenuSidebar} />

                <RpMenuSidebar />

                <div
                    style={{position: 'relative'}}
                    className="Main content-wrapper"
                >
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route
                                exact
                                path={`${pathName}/`}
                                component={Dashboard}
                            />
                            <Route exact path="/profile" component={Profile} />
                            <Route
                                exact
                                path={`${pathName}/nominate-user`}
                                component={NominateUser}
                            />
                            <Route
                                exact
                                path={`${pathName}/nominated-users`}
                                component={NominatedUsers}
                            />
                            <Route
                                exact
                                path={`${pathName}/rp-application-registration`}
                                component={RpApplicationRegistration}
                            />
                            <Route
                                exact
                                path={`${pathName}/rp-registered-applications`}
                                component={RpApplications}
                            />
                            <Route
                                exact
                                path={`${pathName}/rp-application-tokens`}
                                component={RpTokens}
                            />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default RpMain;
