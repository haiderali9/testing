import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import './RpMenuSidebar.css';

export const RPMENU = [
    {
        name: 'menusidebar.label.dashboard',
        path: '/rp-main'
    },

    {
        name: 'Relying Parties (RPs)',
        children: [
            {
                name: 'Register Application',
                path: '/rp-main/rp-application-registration'
            },
            {
                name: 'RP Applications',
                path: '/rp-main/rp-registered-applications'
            }
        ]
    },
    {
        name: 'Nominate User',
        children: [
            {name: 'Nominate', path: '/rp-main/nominate-user'},
            {name: "Nominee's List", path: '/rp-main/nominated-users'}
        ]
    },
    {
        name: 'Billing',
        path: '/rp-main/billing'
    }
];

const RpMenuSidebar = () => {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <aside className="main-sidebar Side elevation-4">
            <Link to="/" className="L brand-link">
                <img
                    style={{marginLeft: '10px'}}
                    width="40px"
                    height="40px"
                    src="/logo.png"
                    alt=""
                    className="LogoImg img-circle elevation-1"
                />
                meraID
                {/* <span className="brand-text font-weight-light">meraID</span> */}
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <Link to="/profile">
                            <img
                                style={{backgroundColor: 'white'}}
                                src={user.picture || '/img/default-profile.png'}
                                className="img-circle elevation-1"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="info">
                        <Link
                            to="/profile"
                            className="L RemoveHover d-block"
                            style={{textDecoration: 'none'}}
                        >
                            {/* {user.email} */}
                            Ali Khan
                        </Link>
                    </div>
                </div>

                <nav className="mt-2 overflow-hidden">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                    >
                        {RPMENU.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default RpMenuSidebar;
