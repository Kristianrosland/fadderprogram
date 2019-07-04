import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-regular-svg-icons';

const IconLabel = ({icon, label, link}) => {
    const mappedIcon = Icons[icon];

    return (
        <div className="icon-label-wrapper">
            <FontAwesomeIcon className="event-icon" icon={mappedIcon} />
            { !link && <label className="event-icon-label"> { label } </label> }
            { link && <a className="icon-link event-icon-label" href={link}> { label } </a>}
        </div>
    );
};

export default IconLabel;