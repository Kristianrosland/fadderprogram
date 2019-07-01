import React, { useState, useContext } from 'react';
import NavBarButton from './NavBarButton';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AppContext } from '../App';
import Event from './Event';
import './Mainscreen.scss';

const weekdays = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

const MainScreen = ({ group, events }) => {
    const [ day, setDay ] = useState('mandag')
    const [ state ] = useContext(AppContext);

    const eventList = events
        ? events.filter(e => e.day_nor === day).map(e => <Event key={e.title_nor} data={e} />)
        : null;

    const navBarButtons = weekdays.map(
        (el, idx) => <NavBarButton key={`${el}-${idx}`} target={el} callback={setDay} selected={day === el} />
    )

    return (
        <div className="mainscreen-wrapper">
            <div className="mainscreen-header"> 
                <label> { state.lang === 'NO' ? group.label_nor : group.label_eng } </label>
            </div>
            <PerfectScrollbar className="mainscreen-event-container">
                { eventList }
            </PerfectScrollbar>
            <div className="mainscreen-navbar-container">
                { navBarButtons }
            </div>
        </div>
    );
};

export default MainScreen;