import React, { useState, useEffect } from 'react';
import EditableEvent from './EditableEvent';
import { eventFilter, groupEventsByDay, weekdays_NO } from './utils';
import { Loader, Button } from 'semantic-ui-react';
import CreateNewEvent from './CreateNewEvent';
import Modal from 'react-modal';
import './eventManager.scss';

Modal.setAppElement('#root')
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.50)';

const AddEventButton = ({ handleClick }) => {
    return <div className="add-event-button" onClick={handleClick}><p>+</p></div>
}

const EventManager = ({ user, events = [], firestore }) => {
    const [ groups, setGroups ] = useState(undefined);
    const [ createNew, setCreateNew ] = useState(false);
    const [ editEvent, setEditEvent ] = useState(undefined);
    const [ eventToBeDeleted, setEventToBeDeleted ] = useState(undefined);

    useEffect(() => {
        firestore.fetchGroupsThatUserAdministrates(user.uid, setGroups);
    }, [firestore, user.uid]);

    const filteredEvents = !groups ? [] : events.filter(e => eventFilter(groups, e));
    const groupedEvents = groupEventsByDay(filteredEvents);
    const logout = () => firestore.logout();

    if (createNew || editEvent) {
        return <CreateNewEvent 
                    existingEvent={events.filter(e => e.id === editEvent)[0]}
                    editing={editEvent !== undefined}
                    cancelCallback={() => { setCreateNew(false); setEditEvent(undefined); window.scrollTo(0,0); } } 
                    submitCallback={event => { 
                        firestore.addEvent(event, user.uid).then(setCreateNew(false)); 
                        window.scrollTo(0,0);
                    }}
                    submitSubeventCallback={event => {
                        firestore.addSubEvent(event, user.uid);
                    }}
                    deleteSubeventCallback={event_id => {
                        firestore.removeSubEvent(event_id);
                    }}
                    updateCallback={event => {
                        firestore.updateEvent(event).then(setEditEvent(undefined));
                        window.scrollTo(0,0);
                    }}
                    availableGroups={groups} 
                />
    }

    return (
        <div className="event-manager-wrapper">
            <Modal
                isOpen={eventToBeDeleted !== undefined}
                className="delete-event-modal"
            > 
                {eventToBeDeleted && 
                    <label>
                        Er du sikker på at du vil slette <span className="font-bold">{filteredEvents.filter(e => e.id === eventToBeDeleted)[0].title_NO}</span> ?
                    </label>
                }
                <div className="full-width flex-row margin-top-large">
                    <Button secondary onClick={() => setEventToBeDeleted(undefined)}> Nei, gå tilbake </Button>
                    <Button primary onClick={() => { firestore.removeEvent(eventToBeDeleted); setEventToBeDeleted(undefined); }}> Ja, slett! </Button>
                </div>
            </Modal>

            <Loader active={!groups} />
            <div className="add-event-button-wrapper">
                <AddEventButton handleClick={() => setCreateNew(true) } />
            </div>
            { groups && events && weekdays_NO.map(day => {
                const dayEvents = groupedEvents[day].map(e => 
                    <EditableEvent 
                        key={e.id} event={e} 
                        canManage={e.groups.reduce((acc, curr) => acc && groups.indexOf(curr) >= 0 ,true)} 
                        deleteCallback={(id) => setEventToBeDeleted(id)}
                        editCallback={(id) => setEditEvent(id) } />
                );
                return (
                    <div key={day} className="event-group">
                        <div className="event-group-day-label"> { day } </div>
                        { dayEvents }
                    </div>
                )
            })}
            <Button type='button' className="full-width margin-top-medium margin-bottom-large" primary onClick={logout}> Logg ut </Button>            
        </div>
    );
};

export default EventManager;