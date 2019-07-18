import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from './App';
import resource from './textResources';
import Select from 'react-select';

const WelcomeScreen = ({ group, setGroup, setCookie, groupNames }) => {
    const [ state ] = useContext(AppContext);
    const [ selected, setSelected ] = useState(group);
    const lang = state.lang ? state.lang : 'NO'
    const groups = groupNames 
        ? groupNames.map(
            ({ id, label_nor, label_eng }) => (
                {   value: id, 
                    label: lang === 'NO' ? label_nor : label_eng,
                    label_nor: label_nor, 
                    label_eng: label_eng })
                ).sort((a, b) => parseInt(a.value) - parseInt(b.value)) 
        : [];
    
    const submit = () => {
        if (selected) {
            setGroup(selected);
            setCookie('group', selected, { path: '/'});
        }
    }

    const customStyles = {
        container: provided => ({
                ...provided,
                width: '100%',
                marginBottom: 20,
        }),
        option: provided => ({
            ...provided,
            fontSize: '0.8rem',
        }),
        menu: provided => ({
            ...provided,
            marginTop: 0,
        })
    }

    const currentSelectedLabel = selected && { label: (lang === 'NO' ? selected.label_nor : selected.label_eng) };
    const header = resource('WELCOME', state);
    const subtitle = resource('WELCOME_SUBTITLE', state);
    const placeholder = resource('GROUP_PLACEHOLDER', state);
    const buttonLabel = resource('WELCOME_SCREEN_BUTTON_LABEL', state);

    return (
        <div className="welcome-screen">
            <div>
                <h1 className="welcome-screen-main-title"> { header } </h1>
                <h3 className="welcome-screen-sub-title"> { subtitle } </h3>
            </div>
            <img className="person-img" src="https://image.flaticon.com/icons/svg/145/145867.svg" alt="person" />
            <div className="dropdown-wrapper">
                <Select 
                    inputProps={{ readOnly:true }}
                    placeholder={ placeholder } 
                    styles={ customStyles } 
                    value={ currentSelectedLabel } 
                    onChange={(v) => setSelected(v)} 
                    options={ groups } 
                    isSearchable={ false }
                    isDisabled={groups.length === 0}
                />
                <div className="ready-button" onClick={submit}>
                    <p className="ready-button-text"> { buttonLabel } <FontAwesomeIcon icon={faChevronRight} /> </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;