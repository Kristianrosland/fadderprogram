import React, { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import EventManager from './EventManager';
import { Loader, Dimmer } from 'semantic-ui-react';
import './backOffice.scss';

const BackOffice = ({ firestore }) => {
    const [ events, setEvents ] = useState(undefined);
    const [ user, setUser ] = useState(undefined);
    const [ loadingUser, setLoadingUser ] = useState(true);

    useEffect(() => {
        firestore.fetchEvents(setEvents);
        firestore.registerForAuthUpdates(setUser, setLoadingUser);
    }, [firestore])

    return (
        <div className="back-office-wrapper">
            <Dimmer active={loadingUser} ><Loader active={loadingUser} /></Dimmer>
            { !loadingUser &&
                <>
                    <div className="back-office-header"> Adminpanel </div>
                    { !user && <LoginScreen firestore={firestore} /> }
                    { user && <EventManager user={user} firestore={firestore} events={events} /> }
                </>
            }
        </div>
    );
};

export default BackOffice;