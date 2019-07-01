import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from './Mainscreen/MainScreen';
import Firebase from './Firestore'
import './App.css';

const firestore = new Firebase();
const AppContext = React.createContext();

function App() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['group']);
  const [ group, setGroup ] = useState(cookies.group)
  const [ events, setEvents ] = useState(undefined)
  const [ groupNames, setGroupNames ] = useState(undefined)
  const [ state, setState ] = useState({ lang: 'NO' });
  const setLanguage = () => setState({ ...state, lang: state.lang === 'NO' ? 'EN' : 'NO' })

  useEffect(() => {
    firestore.fetchEvents(setEvents);
    firestore.fetchGroupNames(setGroupNames)
  }, [setEvents, setGroupNames])

  return (
    <AppContext.Provider value={[ state, setState ]}>
      <div className="app">
        <div className={`language-button ${state.lang === 'NO' ? 'uk-button' : 'nor-button'}`} onClick={setLanguage}/>
        { !group && <WelcomeScreen groupNames={groupNames} setGroup={setGroup} setCookie={setCookie} /> }
        { group && <MainScreen events={events} group={group} setGroup={setGroup} removeCookie={removeCookie}/> }
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
