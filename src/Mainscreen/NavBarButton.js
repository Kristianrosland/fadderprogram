import React from 'react';

const NavBarButton = ({target, callback, selected}) => {
    const iconColor = selected ? 'navbar-selected' : '';

    return (
        <div className="navbar-button" onClick={() => callback(target)}>
            <div className={`${iconColor} navbar-button-icon`} />
            <label> { target.substring(0,3) } </label>
        </div>
    );
};

export default NavBarButton;