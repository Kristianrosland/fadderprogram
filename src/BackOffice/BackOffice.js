import React, { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import EventManager from "./EventManager";
import { Loader, Dimmer } from "semantic-ui-react";
import "./backOffice.scss";
import { createAddressSuggestions } from "./utils";

const BackOffice = ({ firestore }) => {
  const [events, setEvents] = useState([]);
  const [subEvents, setSubEvents] = useState([]);
  const [user, setUser] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  const [oldEvents, setOldEvents] = useState([]);
  const [oldSubEvents, setOldSubEvents] = useState([]);

  const allEvents = [...events, ...oldEvents];
  const allSubEvents = [...subEvents, ...oldSubEvents];

  useEffect(() => {
    firestore.fetchEvents(setEvents, setOldEvents);
    firestore.fetchSubEvents(setSubEvents, setOldSubEvents);
    firestore.registerForAuthUpdates(setUser, setLoadingUser);
  }, [firestore]);

  const eventsWithSubEvents =
    allEvents.length === 0
      ? []
      : allEvents.map((e) => ({
          ...e,
          subEvents: allSubEvents.filter((s) => s.parent_event_id === e.id),
        }));
  const addressSuggestions = createAddressSuggestions(allSubEvents);

  return (
    <div className="back-office-wrapper" id="app">
      <Dimmer active={loadingUser}>
        <Loader active={loadingUser} />
      </Dimmer>
      {!loadingUser && (
        <>
          <div className="back-office-header"> Adminpanel </div>
          {!user && <LoginScreen firestore={firestore} />}
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
