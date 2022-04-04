import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import {DateTime} from 'luxon';
import {useTranslation} from 'react-i18next';
import {Dropdown} from '@components';
import {logout} from '@app/store/reducers/auth.thunk';
import Spinner from '@app/spinner/Spinner';

const UserDropdown = () => {
    const history = useHistory();
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const {currentUser: user, isLoading} = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logOut = () => {
        dispatch(logout());
        setDropdownOpen(false);
    };

    return (
        <Dropdown
            isOpen={dropdownOpen}
            onChange={(open) => setDropdownOpen(open)}
            className="user-menu"
            menuContainerTag="ul"
            buttonTemplate={
                <img
                    src={user.picture || '/img/default-profile.png'}
                    className="user-image img-circle elevation-2"
                    alt="User"
                />
            }
            menuTemplate={
                <>
                    <li className="user-header ">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-1"
                            alt="User"
                        />
                        <p>Ali Khan</p>
                        <p style={{marginTop: '-15px'}}>
                            <small>
                                {user.email}
                                <br />

                                {/* <span>Member since 2021</span> */}
                                {/* <span>
                                    {DateTime.fromISO(user.createdAt).toFormat(
                                        'dd LLL yyyy'
                                    )}
                                </span> */}
                            </small>
                        </p>
                        <button
                            style={{
                                border: 'solid 1px',
                                borderRadius: '80px'
                            }}
                            type="button"
                            className="btn btn-sm"
                        >
                            <Link
                                to="/profile"
                                className="L RemoveHover d-block"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    padding: '2px'
                                }}
                            >
                                Manage Your Account
                            </Link>
                        </button>
                    </li>
                    {/* <li className="user-body">
                        <div className="row"> */}
                    {/* <div className="col-4 text-center">
                                <Link to="/">{t('header.user.followers')}</Link>
                            </div>
                            <div className="col-4 text-center">
                                <Link to="/">{t('header.user.sales')}</Link>
                            </div>
                            <div className="col-4 text-center">
                                <Link to="/">{t('header.user.friends')}</Link>
                            </div> */}
                    {/* </div>
                    </li> */}
                    <li className="user-footer" style={{marginTop: '50px'}}>
                        {/* <button
                            type="button"
                            className="btn btn-default btn-flat"
                            onClick={navigateToProfile}
                        >
                            {t('header.user.profile')}
                        </button> */}
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <button
                                type="button"
                                className="btn btn-danger float-right"
                                onClick={logOut}
                            >
                                {t('login.button.signOut')}
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                history.replace('/rp-main');
                            }}
                        >
                            Switch To RP Portal
                        </button>
                    </li>
                </>
            }
        />
    );
};

export default UserDropdown;
