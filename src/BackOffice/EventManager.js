import React, { useState, useEffect } from 'react';
import EditableEvent from './EditableEvent';
import { eventFilter, groupEventsByDay, weekdays_NO } from './utils';
import { Loader } from 'semantic-ui-react';
import CreateNewEvent from './CreateNewEvent';
import './eventManager.scss';

const AddEventButton = ({ handleClick }) => {
    return <div className="add-event-button" onClick={handleClick}><p>+</p></div>
}

const EventManager = ({ user, events = [], firestore }) => {
    const [ groups, setGroups ] = useState(undefined);
    const [ createNew, setCreateNew ] = useState(false);

    useEffect(() => {
        firestore.fetchGroupsThatUserAdministrates(user.uid, setGroups);
    }, [firestore, user.uid]);

    const filteredEvents = !groups ? [] : events.filter(e => eventFilter(groups, e));
    const groupedEvents = groupEventsByDay(filteredEvents);

    if (createNew) {
        return <CreateNewEvent 
                    cancelCallback={() => { setCreateNew(false); } } 
                    submitCallback={event => { 
                        firestore.addEvent(event, user.uid).then(setCreateNew(false)); 
                    }}
                    availableGroups={groups} 
                />
    }

    return (
        <div className="event-manager-wrapper">
            <Loader active={!groups} />
            <div className="add-event-button-wrapper">
                <AddEventButton handleClick={() => setCreateNew(true) } />
            </div>
            { groups && events && weekdays_NO.map(day => {
                const dayEvents = groupedEvents[day].map(e => 
                    <EditableEvent 
                        key={e.id} event={e} 
                        canManage={e.groups.reduce((acc, curr) => acc && groups.indexOf(curr) >= 0 ,true)} 
                        deleteCallback={(id) => firestore.removeEvent(id)}
                        editCallback={(id) => console.log(id)} />
                );
                return (
                    <div key={day} className="event-group">
                        <div className="event-group-day-label"> { day } </div>
                        { dayEvents }
                    </div>
                )
            })}            
        </div>
    );
};

export default EventManager;