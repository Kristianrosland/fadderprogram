import React, { useState, useEffect } from "react";
import EditableEvent from "./EditableEvent";
import { groupEventsByDay, weekdays_NO } from "./utils";
import { Loader, Button } from "semantic-ui-react";
import CreateNewEvent from "./CreateNewEvent";
import DeleteModal from "./DeleteModal";
import AddEventButton from "./AddEventButton";
import "./eventManager.scss";

const EventManager = ({ user, events = [], addressSuggestions, firestore }) => {
  const [groups, setGroups] = useState(undefined);
  const [createNew, setCreateNew] = useState(false);
  const [editEvent, setEditEvent] = useState(undefined);
  const [eventIdToBeDeleted, setEventIdToBeDeleted] = useState(undefined);

  useEffect(() => {
    firestore.fetchGroupsThatUserAdministrates(user.uid, setGroups);
  }, [firestore, user.uid]);

  const groupedEvents = groupEventsByDay(events);
  const logout = () => firestore.logout();

  /** Hvis createNew eller editEvent er satt til true, skal vi vise CreateNewEvent-komponenten */
  if (createNew || editEvent) {
    return (
      <CreateNewEvent
        existingEvent={events.filter((e) => e.id === editEvent)[0]}
        editing={editEvent !== undefined}
        cancelCallback={() => {
          setCreateNew(false);
          setEditEvent(undefined);
          window.scrollTo(0, 0); // Scroll til toppen ved cancel
        }}
        submitCallback={(event) => {
          firestore.addEvent(event, user.uid).then(setCreateNew(false));
          window.scrollTo(0, 0);
        }}
        submitSubeventCallback={(event) => {
          firestore.addSubEvent(event, user.uid);
        }}
        deleteSubeventCallback={(event_id) => {
          firestore.removeSubEvent(event_id);
        }}
        updateCallback={(event) => {
          firestore.updateEvent(event).then(setEditEvent(undefined));
          window.scrollTo(0, 0);
        }}
        availableGroups={groups}
        addressSuggestions={addressSuggestions}
      />
    );
  }

  /** Sletter eventet fra firebase og setter eventId til undefined (da lukkes pop-upen) */
  const deleteEvent = () => {
    firestore.removeEvent(eventIdToBeDeleted).catch((err) => console.log(err));
    setEventIdToBeDeleted(undefined);
  };

  /** Dersom man klikker enter når pop-upen er åpen, slettes eventet */
  const onKeyPress = (event) => {
    if (event.key === "Enter" && eventIdToBeDeleted) {
      deleteEvent();
    }
  };

  return (
    <div className="event-manager-wrapper" onKeyPress={onKeyPress}>
      {/** Bekreftelse pop-up etter at man har trykket på søppelbøtta **/}
      <DeleteModal
        eventId={eventIdToBeDeleted}
        events={events}
        deleteEvent={deleteEvent}
        cancel={() => setEventIdToBeDeleted(undefined)}
      />

      {/** Dersom grupper ikke er hentet enda (groups === undefined) så vises en loader-komponent */}
      <Loader active={!groups} />

      <div className="add-event-button-wrapper">
        <AddEventButton handleClick={() => setCreateNew(true)} />
      </div>

      {/** Dersom vi har henta grupper og events, så viser vi events gruppert på dager **/}
      {groups &&
        events &&
        weekdays_NO.map((day) => (
          <div key={day} className="event-group">
            <div className="event-group-day-label"> {day} </div>
            {groupedEvents[day].map((e) => (
              <EditableEvent
                key={e.id}
                event={e}
                canManage={e.groups.every((e) => groups.indexOf(e) >= 0)}
                deleteCallback={(id) => setEventIdToBeDeleted(id)}
                editCallback={(id) => setEditEvent(id)}
              />
            ))}
          </div>
        ))}

      <Button
        type="button"
        className="full-width margin-top-medium margin-bottom-large"
        primary
        onClick={logout}
      >
        Logg ut
      </Button>
    </div>
  );
};

export default EventManager;
