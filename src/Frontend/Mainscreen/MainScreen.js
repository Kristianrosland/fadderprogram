import React, { useState, useContext } from 'react';
import NavBarButton from './NavBarButton';
import { AppContext } from '../App';
import Event from './Event';
import { weekdays, translateDayIdx, eventTimeComparator} from '../utils'
import './Mainscreen.scss';

const eventForGroupFilter = (event, group) => {
    if (!group || !group.value) return false; //If group is not set, show no events.
    if (!event.groups || event.groups.toLowerCase() === 'all') return true;
    return event.groups.replace(' ', '').split(',').indexOf(group.value) >= 0; 
}

const MainScreen = ({ group, events }) => {
    const [ day, setDay ] = useState(0)
    const [ state ] = useContext(AppContext);
    const eventList = events
        ? events
            .filter(e => translateDayIdx(e.day_NO) === day)
            .filter(e => eventForGroupFilter(e, group))
            .sort(eventTimeComparator)
            .map((e,idx) => <Event key={e.id} data={e} />)
        : null;

    const navBarButtons = weekdays.map(
        el => <NavBarButton key={el.NO} lang={state.lang} target={el} callback={setDay} selected={day === el.id} />
    )

    return (
        <div className="mainscreen-wrapper">
            <div className="mainscreen-header"> 
                { <label> { state.lang === 'NO' ? group.label_nor : group.label_eng } </label> }
            </div>
            <div className="mainscreen-event-container">
                { eventList }
            </div>
            <div className="mainscreen-navbar-container">
                { navBarButtons }
            </div>
        </div>
    );
};

export default MainScreen;