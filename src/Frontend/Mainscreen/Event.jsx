import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import IconLabel from './IconLabel';
import { AppContext } from '../App';
import { eventTimeComparator, selectField, selectTime, selectGroups, mapTimeOnPosts } from '../utils';
import Posts from "./Posts";
import './event.scss';

/***********************************/
/**** Gammel SubEvent component ****/
/***********************************/
const SubEvent = ({ event, event: { google_maps }, lang }) => {
    const showUrl = google_maps && google_maps.startsWith('https');

    return (
        <div className="sub-event">
            <div className="sub-event-time-and-title">
                <p className="sub-event-time"> { selectTime(event) } </p>
                <p className="sub-event-title"> { selectField(event, 'title', lang ) } </p>
            </div>
            { showUrl && <a className="sub-event-address" href={google_maps} rel="noopener noreferrer" target="_blank"> { lang === 'NO' ? '(kart)' : '(map)' } </a> }
        </div>
    );
}

/*****************************/
/****** Event component ******/
/*****************************/
const Event = ({ data, group }) => {
    const event = data;
    const posts = data.posts
    const [ open, setOpen ] = useState(true);
    const [ state ] = useContext(AppContext);
    const lang = state.lang;
    const title = selectField(event, 'title', lang);
    const description = selectField(event, 'desc', lang);
    const from = selectField(event, 'from', lang)
    const time = selectTime(event);
    const groups = selectGroups(event, lang);
    const address = data.address;
    const googleMaps = data.google_maps;
    const link = data.link;
    const linkText = selectField(event, 'linkText', lang);
    const chevron = open ? SolidIcons["faChevronUp"] : SolidIcons["faChevronDown"];

    const sortedPosts = !posts ? [] : posts.sort((p1, p2) => p1.order.indexOf(group.value) - p2.order.indexOf(group.value));

    const postsWithTime = mapTimeOnPosts(event, sortedPosts);

    return (
        <div className="event-wrapper">
            <div className="event">
                <label className="event-title"> { title } </label>
                { time && <IconLabel icon="faClock" label={time} />}
                { open && address && <IconLabel icon="faMap" label={address} link={googleMaps ? googleMaps : null}/> }
                { open && data.groups && <IconLabel icon="faUser" label={groups} /> }
                { open && from && <IconLabel icon="faComment" label={from} /> }
                { open && link && linkText && <IconLabel icon="faLink" label={linkText} link={link}/> }
                { open && description && <p className="event-description"> { description } </p> }
                {/***********************************/
                 /**** Gammel SubEvent component ****/}
                { open && event.subEvents && event.subEvents.length > 0 && ( 
                    <div className="sub-event-wrapper">
                        { event.subEvents
                            .sort(eventTimeComparator)
                            .map(e => <SubEvent key={`${e.parent_event_id}-${e.title_NO}`} event={e} lang={lang}/>) }
                    </div>
                )}
                 {/***********************************/}

                { open && posts?.length > 1 && (
                    <div className="sub-event-wrapper">
                        { postsWithTime.map( e => <Posts key={e.id} post={e} lang={lang}/>) }
                    </div>
                )}
                <div className="event-chevron" onClick={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={chevron} />
                </div>
            </div>
        </div>
    );
};

export default Event;