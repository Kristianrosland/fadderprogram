import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from './Mainscreen/MainScreen';
import SelectLanguage from './SelectLanguage';
import './App.scss';

const AppContext = React.createContext();

function App(props) { 
  const { firestore } = props;
  const [ cookies, setCookie, removeCookie ] = useCookies(['group', 'language']);
  const [ group, setGroup ] = useState(cookies.group)
  const [ events, setEvents ] = useState([])
  const [ subEvents, setSubEvents ] = useState([])
  const [ groupNames, setGroupNames ] = useState([])
  const [ state, setState ] = useState({ lang: cookies.language ? cookies.language : 'NO' });
  const changeLanguage = () => {
    const newLang = state.lang === 'NO' ? 'EN' : 'NO';

    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() + 7);
    setCookie('language', newLang, { path: '/', expires: oneWeek })
    setState({ ...state, lang: newLang });
  }

  useEffect(() => {
    firestore.fetchEvents(setEvents);
    firestore.fetchSubEvents(setSubEvents);
    firestore.fetchGroupNames(setGroupNames)
  }, [firestore, setEvents, setGroupNames])

  const eventsWithSubevents = events.map(e => ({ ...e, subEvents: subEvents.filter(s => s.parent_event_id === e.id)}));
  
  return (
    <AppContext.Provider value={[ state, setState ]}>
      <div className="app">
        { <SelectLanguage state={state} changeLanguage={changeLanguage} /> }
        { !group && <WelcomeScreen groupNames={groupNames} setGroup={setGroup} setCookie={setCookie} /> }
        { group && <MainScreen events={eventsWithSubevents} group={group} removeGroup={() => { removeCookie('group'); setGroup(undefined) }} /> }
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
