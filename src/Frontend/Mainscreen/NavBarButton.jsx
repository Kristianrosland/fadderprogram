import React from 'react';

const NavBarButton = ({target: { id, NO, EN }, lang, callback, selected}) => {
    const iconColor = selected ? 'navbar-selected' : '';
    const day = lang === 'NO' ? NO : EN;
    
    return (
        <div className="navbar-button" onClick={() => callback(id)}>
            <div className={`${iconColor} navbar-button-icon`} />
            <label> { day.substring(0,3) } </label>
        </div>
    );
};

export default NavBarButton;