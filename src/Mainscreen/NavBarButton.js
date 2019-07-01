import React from 'react';

const NavBarButton = ({target, callback, selected}) => {
    const iconColor = selected ? 'navbar-selected' : '';

    return (
        <button className="navbar-button" onClick={() => callback(target)}>
            <div className={`${iconColor} navbar-button-icon`} />
            <label> { target.substring(0,3) } </label>
        </button>
    );
};

export default NavBarButton;