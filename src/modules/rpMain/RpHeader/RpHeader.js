import React from 'react';
import RpDropdown from '@app/modules/rpMain/RpHeader/rpDropdown/RpDropdown';
import RpList from './rpList/RpList';

const RpHeader = ({toggleMenuSidebar}) => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={() => toggleMenuSidebar()}
                        type="button"
                        className="nav-link"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <div className="pr-5">
                    <RpList />
                </div>
                <RpDropdown />
            </ul>
        </nav>
    );
};

export default RpHeader;
