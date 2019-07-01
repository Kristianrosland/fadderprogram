import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import IconLabel from './IconLabel';
import { AppContext } from '../App';
import './event.scss'

const Event = ({ data }) => {
    const [ open, setOpen ] = useState(false);
    const [ state ] = useContext(AppContext);
    const lang = state.lang;
    const title = lang === 'NO' ? data.title_nor : data.title_eng;
    let description = lang === 'NO' ? data.desc_nor : data.desc_eng;
    const start_time = data.start_time;
    const end_time = data.end_time ? ` – ${data.end_time}` : '';
    const time = start_time + end_time;
    const groups = data.groups === 'all' ? (lang === 'NO' ? 'Alle grupper' : 'All groups') : `Gruppe ${data.groups}`
    const from = lang === 'NO' ? `Fra ${data.from_nor}` : `From ${data.from_eng}`;
    const address = data.address;
    const googleMaps = data.google_maps;
    const chevron = open ? SolidIcons["faChevronUp"] : SolidIcons["faChevronDown"];

    return (
        <div className="event">
            <label className="event-title"> { title } </label>
            { time && <IconLabel icon="faClock" label={time} />}
            { address && <IconLabel icon="faMap" label={address} link={googleMaps ? googleMaps : null}/> }
            { data.groups && <IconLabel icon="faUser" label={groups} /> }
            { from && <IconLabel icon="faComment" label={from} />}
            <p className="event-description">{ description }</p>
            <div className="event-chevron" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={chevron} />
            </div>
        </div>
    );
};

export default Event;