import React, { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import EventManager from './EventManager';
import { Loader, Dimmer } from 'semantic-ui-react';
import './backOffice.scss';
import { createAddressSuggestions } from './utils';

const BackOffice = ({ firestore }) => {
    const [ events, setEvents ] = useState([]);
    const [ subEvents, setSubEvents ] = useState([])
    const [ user, setUser ] = useState(undefined);
    const [ loadingUser, setLoadingUser ] = useState(true);


    useEffect(() => {
        firestore.fetchEvents(setEvents);
        firestore.fetchSubEvents(setSubEvents);
        firestore.registerForAuthUpdates(setUser, setLoadingUser);
    }, [firestore])

    const eventsWithSubEvents = events.length === 0 ? [] : events.map(e => ({ ...e, subEvents: subEvents.filter(s => s.parent_event_id === e.id)}));
    const addressSuggestions = createAddressSuggestions(subEvents);

    return (
        <div className="back-office-wrapper" id="app">
            <Dimmer active={loadingUser} ><Loader active={loadingUser} /></Dimmer>
            { !loadingUser &&
                <>
                    <div className="back-office-header"> Adminpanel </div>
                    { !user && <LoginScreen firestore={firestore} /> }
                    { user && <EventManager user={user} firestore={firestore} events={eventsWithSubEvents} addressSuggestions={addressSuggestions} /> }
                </>
            }
        </div>
    );
};

export default BackOffice;