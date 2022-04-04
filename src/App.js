import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import Main from '@modules/main/Main';
import RpMain from '@modules/rpMain/RpMain';
import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import PrivacyPolicy from '@modules/privacy-policy/PrivacyPolicy';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
    const windowSize = useWindowSize();
    const screenSize = useSelector((state) => state.ui.screenSize);
    const dispatch = useDispatch();

    useEffect(() => {
        const size = calculateWindowSize(windowSize.width);
        if (screenSize !== size) {
            dispatch(setWindowSize(size));
        }
    }, [windowSize]);

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login">
                    <Login />
                </PublicRoute>
                <PublicRoute exact path="/register">
                    <Register />
                </PublicRoute>
                <PublicRoute exact path="/forgot-password">
                    <ForgetPassword />
                </PublicRoute>
                <PublicRoute exact path="/recover-password">
                    <RecoverPassword />
                </PublicRoute>
                <PublicRoute exact path="/privacy-policy">
                    <PrivacyPolicy />
                </PublicRoute>
                <PublicRoute exact path="/callback">
                    <h1>Callback</h1>
                </PublicRoute>
                <PrivateRoute path="/admin-main">
                    <Main />
                </PrivateRoute>
                <PrivateRoute path="/rp-main">
                    <RpMain />
                </PrivateRoute>
                <Redirect
                    to={{
                        pathname: '/admin-main',
                        state: {from: '/'}
                    }}
                />
            </Switch>
        </Router>
    );
};

export default App;
