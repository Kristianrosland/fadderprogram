import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import IconLabel from './IconLabel';
import { AppContext } from '../App';
import './event.scss'

const selectField = (event, field, lang) => {
    const language = lang ? lang : 'NO';
    const key = `${field}_${language}`

    if (!event[key]) return '';
    else if (field === 'from') return `${language === 'NO' ? 'Fra' : 'From'} ${event[key]}`
    else return event[key];
}

const selectTime = ({ start_time, end_time }) => {
    if (!start_time) return '';
    if (!end_time) return start_time;

    return `${start_time} – ${end_time}`;
}

const selectGroups = ({ groups }, lang) => {
    const language = lang ? lang : 'NO';
    if (groups === 'all') return language === 'NO' ? 'Alle grupper' : 'All groups';
    
    const prefix = language === 'NO' ? 'Gruppe ' : 'Group ';
    return `${prefix} ${groups}`;   
}

const Event = ({ data }) => {
    const event = data;
    const [ open, setOpen ] = useState(false);
    const [ state ] = useContext(AppContext);
    const lang = state.lang;
    const title = selectField(event, 'title', lang);
    const description = selectField(event, 'desc', lang);
    const from = selectField(event, 'from', lang)
    const time = selectTime(event);
    const groups = selectGroups(event, lang);
    const address = data.address;
    const googleMaps = data.google_maps;
    const chevron = open ? SolidIcons["faChevronUp"] : SolidIcons["faChevronDown"];

    return (
        <div className="event-wrapper">
            <div className="event">
                <label className="event-title"> { title } </label>
                { time && <IconLabel icon="faClock" label={time} />}
                { address && <IconLabel icon="faMap" label={address} link={googleMaps ? googleMaps : null}/> }
                { data.groups && <IconLabel icon="faUser" label={groups} /> }
                { from && <IconLabel icon="faComment" label={from} /> }
                <p className="event-description">{ description }</p>
                { /* <div className="event-chevron" onClick={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={chevron} />
                </div> */ }
            </div>
        </div>
    );
};

export default Event;