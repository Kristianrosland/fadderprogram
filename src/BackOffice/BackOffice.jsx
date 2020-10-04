import React, { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import EventManager from "./EventManager";
import { Loader, Dimmer } from "semantic-ui-react";
import "./backOffice.scss";
import { createAddressSuggestions, addSubEventsToEvents } from "./utils";

const BackOffice = ({ firestore }) => {
  const [events, setEvents] = useState([]);
  const [subEvents, setSubEvents] = useState([]);
  const [user, setUser] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  // useEffect-koden kjøres førte gang komponenten vises (dvs. når den 'mountes')
  useEffect(() => {
    firestore.fetchEvents(setEvents);
    firestore.fetchSubEvents(setSubEvents);
    firestore.registerForAuthUpdates(setUser, setLoadingUser);
  }, [firestore]);

  const eventsWithSubEvents = addSubEventsToEvents(events, subEvents);
  const addressSuggestions = createAddressSuggestions(subEvents);

  return (
    <div className="back-office-wrapper" id="app">
      <Dimmer active={loadingUser}>
        <Loader active={loadingUser} />
      </Dimmer>

      {!loadingUser && (
        <>
          <div className="back-office-header"> Adminpanel </div>
          {/** Hvis det ikke finnes en bruker, så viser vi LoginScreen-komponenten */}
          {!user && <LoginScreen firestore={firestore} />}

          {/** Hvis det finnes en bruker, så viser vi EventManager-komponenten */}
          {user && (
            <EventManager
              user={user}
              firestore={firestore}
              events={eventsWithSubEvents}
              addressSuggestions={addressSuggestions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BackOffice;
