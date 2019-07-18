import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import WelcomeScreen from './WelcomeScreen';
import MainScreen from './Mainscreen/MainScreen';
import SelectLanguage from './SelectLanguage';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const AppContext = React.createContext();

function App(props) {
  const { firestore } = props;
  const [ cookies, setCookie, removeCookie ] = useCookies(['group', 'language']);
  const [ group, setGroup ] = useState(cookies.group)
  const [ events, setEvents ] = useState(undefined)
  const [ groupNames, setGroupNames ] = useState(undefined)
  const [ state, setState ] = useState({ lang: cookies.language ? cookies.language : 'NO' });
  const changeLanguage = () => {
    const newLang = state.lang === 'NO' ? 'EN' : 'NO';
    setCookie('language', newLang)
    setState({ ...state, lang: newLang });
  }

  useEffect(() => {
    firestore.fetchEvents(setEvents);
    firestore.fetchGroupNames(setGroupNames)
  }, [firestore, setEvents, setGroupNames])
  
  return (
    <AppContext.Provider value={[ state, setState ]}>
      <div className="app">
        <a href="tel:40466599" className="sticky-side-button">
          <FontAwesomeIcon className="phone-icon" icon={faPhone} />
          <div className="phonenumber-container">
            <span> Vakttelefon </span>
            <span className="phone-number"> 404 66 599 </span>
          </div>
        </a>
        {  <SelectLanguage state={state} changeLanguage={changeLanguage} /> }
        { !group && <WelcomeScreen groupNames={groupNames} setGroup={setGroup} setCookie={setCookie} /> }
        { group && <MainScreen events={events} group={group} setGroup={setGroup} removeCookie={removeCookie}/> }
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
