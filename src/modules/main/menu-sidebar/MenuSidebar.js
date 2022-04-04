import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import './MenuSidebar.css';

export const MENU = [
    {
        name: 'menusidebar.label.dashboard',
        path: '/'
    },
    {
        name: 'User Registrations',
        path: '/admin-main/user-registration'
    },
    {
        name: 'Relying Parties (RPs)',
        children: [
            {
                name: 'Create Relying Party',
                path: '/admin-main/create-relying-party'
            },
            {
                name: 'Active Relying Parties',
                path: '/admin-main/relying-parties-list'
            },
            {
                name: 'Block Relying Parties',
                path: '/admin-main/blocked-relying-parties'
            }
        ]
    },
    {
        name: 'User Admin',
        children: [
            {
                name: 'Create User',
                path: '/admin-main/create-user'
            },
            {
                name: 'User List',
                path: '/admin-main/user-list'
            },
            {
                name: 'Assign Role',
                path: '/admin-mainassign-role'
            }
        ]
    },
    {
        name: 'Roles',
        children: [
            {
                name: 'Create Role',
                path: '/admin-main/create-role'
            },
            {
                name: 'Roles List',
                path: '/admin-main/roles-list'
            },
            {
                name: 'Assign Permissions',
                path: '/admin-main/assign-permissions'
            }
        ]
    },
    {
        name: 'RP Subscription',
        path: '/admin-main/rp-subscription'
    },
    {
        name: 'Blacklist User',
        path: '/admin-main/black-list-user'
    },
    {
        name: 'Billing',
        path: '/admin-main/billing'
    }
];

const MenuSidebar = () => {
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
                        {MENU.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
