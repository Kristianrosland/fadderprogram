import React, { useState, useContext, useRef } from 'react';
import NavBarButton from './NavBarButton';
import { AppContext } from '../App';
import Event from './Event';
import resource from '../textResources';
import Skeleton from 'react-loading-skeleton';
import { weekdays, translateDayIdx, dayToday, eventTimeComparator} from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import teknaLogo from './tekna-logo.jpg';
import './Mainscreen.scss';

const noisyWidth = baseWidth => baseWidth + (-10) + Math.random()*25

const skeleton = (
    <div className="skeleton-wrapper">
        <Skeleton key={'skel-1'} height={24} width={noisyWidth(170)}/>
        <div className="icon-label-skeletons">
            <Skeleton key={'skel-2'} height={13} width={noisyWidth(110)}/>
            <Skeleton key={'skel-3'} height={13} width={noisyWidth(210)}/>
            <Skeleton key={'skel-4'} height={13} width={noisyWidth(100)}/>
            <Skeleton key={'skel-5'} height={13} width={noisyWidth(155)}/>
        </div>,
        <Skeleton key={'skel-6'} height={13} width={noisyWidth(275)} count={3} />
    </div>
)

const eventForGroupFilter = (event, group) => {
    if (!group || !group.value) return false; //If group is not set, show no events.
    if (!event.groups || event.groups.indexOf('all') >= 0) return true;
    return event.groups.indexOf(group.value) >= 0; 
}

const MainScreen = ({ group, events }) => {
    const [ day, setDay ] = useState(dayToday())
    const [ state ] = useContext(AppContext);
    const TEKNA_DAY = 4; // friday
    const scrollRef = useRef();
    const eventList = events
        ? events
            .filter(e => translateDayIdx(e.day_NO) === day)
            .filter(e => eventForGroupFilter(e, group))
            .sort(eventTimeComparator)
            .map(e => <Event key={e.id} data={e} />)
        : <> { skeleton } { skeleton } </>;

    const navBarButtons = weekdays.map(
        el => <NavBarButton key={el.NO} lang={state.lang} target={el} callback={(day) => { setDay(day); scrollRef.current.scrollTop = 0; }} selected={day === el.id} />
    )

    return (
        <div className="mainscreen-wrapper">
            <a href="tel:004740466599" className="sticky-side-button">
                <FontAwesomeIcon className="phone-icon" icon={faPhone} />
                <div className="phonenumber-container">
                    <span> {resource('EMERGENCY_PHONE_NUMBER', state)} </span>
                    <span className="phone-number"> {resource('PHONE_NUMBER', state)} </span>
                </div>
            </a>
            <div className="mainscreen-header"> 
                { <div className="tekna-container"> { day === TEKNA_DAY && <img className="header-tekna-logo" src={teknaLogo} alt="Tekna logo" /> } </div> }
                { <label> { state.lang === 'NO' ? group.label_nor : group.label_eng } </label> }
            </div>
            <div className="mainscreen-event-container" ref={scrollRef}>
                { eventList }
                { day === TEKNA_DAY && <img className="event-list-tekna-logo" src={teknaLogo} alt="Tekna logo"/>}
                <div className="margin-bottom-XXL mobile-only"></div>
            </div>
            <div className="mainscreen-navbar-container">
                { navBarButtons }
            </div>
        </div>
    );
};

export default MainScreen;