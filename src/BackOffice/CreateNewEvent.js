import React, { useState, useRef } from 'react';
import { Form, TextArea, Button, Input, Checkbox } from 'semantic-ui-react';
import './createNewEvent.scss';
import { translateDay } from '../Frontend/utils';

const CreateNewEvent = ({ availableGroups, cancelCallback, submitCallback }) => {
    const [ titleNO, setTitleNO ] = useState('');
    const [ titleEN, setTitleEN ] = useState('');
    const [ descNO, setDescNO ] = useState('');
    const [ descEN, setDescEN ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ googleMaps, setGoogleMaps ] = useState('');
    const [ startTimeHour, setStartTimeHour ] = useState('')
    const [ startTimeMinute, setStartTimeMinute ] = useState('')
    const [ endTimeHour, setEndTimeHour ] = useState('')
    const [ endTimeMinute, setEndTimeMinute ] = useState('')
    const [ groups, setGroups ] = useState([]);
    const [ day, setDay ] = useState('')
    const [ errors, setErrors ] = useState({ titleNO: false, titleEN: false, descNO: false, descEN: false, day: false, address: false, timeStart: false, timeEnd: false, groups: false })
    const [ submitting, setSubmitting ] = useState(false);

    const startTimeMinuteRef = useRef(null);
    const endTimeMinuteRef = useRef(null);

    const redStar = <span style={{ color: 'red' } }>*</span>
    const allGroupsSelected = groups.indexOf('all') >= 0;

    const generateGoogleMaps = input => {
        if (input.length < 3) { setGoogleMaps(''); return; }
        if (input.toLowerCase().indexOf('bergen') === -1) { 
             input = input + ', Bergen' 
        }

        setGoogleMaps(`https://www.google.com/maps/search/?api=1&query=${input}`);
    }

    const setTime = (event, field) => {
        const input = event.target.value;
        for (const c of input.split('')) { if (c < '0' || c > '9') return }
        const max = field === 'startTimeHour' || field === 'endTimeHour' ? 23 : 59;
        if (input.length > 2 || parseInt(input) > max) return;

        if (field === 'startTimeHour') { 
            if (input.length === 2) startTimeMinuteRef.current.focus();
            setStartTimeHour(input);
        }
        if (field === 'startTimeMinute') setStartTimeMinute(input);
        if (field === 'endTimeHour') {
            if (input.length === 2) endTimeMinuteRef.current.focus();
            setEndTimeHour(input);
        }
        if (field === 'endTimeMinute') setEndTimeMinute(input);
    }

    const handleCheckbox = group => {
        setErrors({ ...errors, groups: false })
        if (group === 'all' && groups.indexOf('all') === -1) { 
            setGroups(['all']);
        } else if (groups.indexOf(group) >= 0) {
            setGroups(groups.filter(g => g !== group));
        } else {
            setGroups([ group, ...groups ]);
        }
    }

    const validateFieldsAndSetErrors = callback => {
        const errs = {
            titleNO: titleNO === '' || titleNO.length > 35,
            titleEN: titleEN === '' || titleEN.length > 35,
            descNO: descNO === '' || descNO.length > 200,
            descEN: descEN === '' || descEN.length > 200,
            timeStart: startTimeHour.length !== 2 || startTimeMinute.length !== 2,
            timeEnd: endTimeHour !== '' && (endTimeHour.length !== 2 || endTimeMinute.length !== 2),
            day: day === '' || ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'].indexOf(day) === -1,
            groups: groups.length === 0,
        };

        callback(errs);
        return !Object.keys(errs).reduce((acc, key) => errs[key] || acc, false);
    }

    const submit = () => {
        if (validateFieldsAndSetErrors(setErrors)) {
            setSubmitting(true);
            const event = {
                title_NO: titleNO,
                title_EN: titleEN,
                desc_NO: descNO, 
                desc_EN: descEN,
                day_NO: day,
                day_EN: translateDay(day),
                from_NO: 'fadderstyret',
                from_EN: 'the mentor board',
                start_time: `${startTimeHour}:${startTimeMinute}`,
                groups: groups,
            };

            if (address.length >= 3) { event.address = address; }
            if (endTimeHour.length === 2 && endTimeMinute.length === 2) { event.end_time = `${endTimeHour}:${endTimeMinute}` }
            if (googleMaps && googleMaps.startsWith('https://')) { event.google_maps = googleMaps; }
            
            submitCallback(event);
        }
    }

    return (
        <div className="flex-column create-event-wrapper">
            <div className="create-event-header"> 
                Legg til et nytt event. Felter merket med {redStar} er obligatoriske. 
            </div>
            <Form className="create-event-form" onSubmit={submit} loading={!availableGroups || submitting}>

                { /** TITTEL  **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Tittel {redStar} </label>
                    <Form.Field error={errors.titleNO}>
                        <label className="form-field-title"> Norsk </label>
                        <Input 
                            value={titleNO} 
                            onChange={e => { setTitleNO(e.target.value); setErrors({ ...errors, titleNO: false }) }} 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field error={errors.titleEN}>
                        <label className="form-field-title"> Engelsk </label>
                        <input 
                            value={titleEN} 
                            onChange={e => { setTitleEN(e.target.value); setErrors({ ...errors, titleEN: false }) }}  
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                </Form.Group>

                { /** DAG **/ }
                <Form.Field error={errors.day}>
                    <label className="form-field-header"> Dag { redStar } </label>
                    <Button.Group className="full-width" >
                        <Button primary={day === 'mandag'} type='button' onClick={() => { setDay('mandag'); setErrors({ ...errors, day: false }) }}> Man </Button>
                        <Button primary={day === 'tirsdag'} type='button' onClick={() => { setDay('tirsdag'); setErrors({ ...errors, day: false }) }}> Tirs </Button>
                        <Button primary={day === 'onsdag'} type='button' onClick={() => { setDay('onsdag'); setErrors({ ...errors, day: false })}}> Ons </Button>
                    </Button.Group>
                    <Button.Group className="full-width margin-top-small">
                        <Button primary={day === 'torsdag'} type='button' onClick={() => { setDay('torsdag'); setErrors({ ...errors, day: false })}}> Tors </Button>
                        <Button primary={day === 'fredag'} type='button' onClick={() => { setDay('fredag'); setErrors({ ...errors, day: false })}}> Fre </Button>
                        <Button primary={day === 'lørdag'} type='button' onClick={() => { setDay('lørdag'); setErrors({ ...errors, day: false })}}> Lør </Button>
                    </Button.Group>
                </Form.Field>

                { /** TID **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Tid </label>
                    <div className="flex-row">
                        <div className="flex-column">
                            <div className="form-field-title"> Start {redStar} </div>
                            <div className="flex-row">
                                <Form.Field error={errors.timeStart}>
                                    <input 
                                        className="time-input"
                                        placeholder="00"
                                        value={startTimeHour} 
                                        onChange={e => { setTime(e, 'startTimeHour'); setErrors({ ...errors, timeStart: false })} }
                                        type="text"
                                        autoComplete="off"
                                    />
                                </Form.Field>
                                <div className="time-separator flex-row align-center justify-center">:</div>
                                <Form.Field error={errors.timeStart}>
                                    <input 
                                        ref={startTimeMinuteRef}
                                        className="time-input"
                                        placeholder="00"
                                        value={startTimeMinute} 
                                        onChange={e => { setTime(e, 'startTimeMinute'); setErrors({ ...errors, timeStart: false })} }
                                        type="text"
                                        autoComplete="off"
                                    />
                                </Form.Field>
                            </div>
                        </div>
                        <div className="flex-column margin-left-large">
                            <div className="form-field-title"> Slutt </div>
                            <div className="flex-row">
                                <Form.Field error={errors.timeEnd}>
                                    <input 
                                        className="time-input"
                                        placeholder="00"
                                        value={endTimeHour} 
                                        onChange={e => { setTime(e, 'endTimeHour'); setErrors({ ...errors, timeEnd: false })} }
                                        type="text"
                                        autoComplete="off"
                                    />
                                </Form.Field>
                                <div className="time-separator flex-row align-center justify-center">:</div>
                                <Form.Field error={errors.timeEnd}>
                                    <input 
                                        ref={endTimeMinuteRef}
                                        className="time-input"
                                        placeholder="00"
                                        value={endTimeMinute} 
                                        onChange={e => { setTime(e, 'endTimeMinute'); setErrors({ ...errors, timeEnd: false })} }
                                        type="text"
                                        autoComplete="off"
                                    />
                                </Form.Field>
                            </div>
                        </div>
                    </div>
                </Form.Group>

                { /** BESKRIVELSE  **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Beskrivelse {redStar} </label>
                    <Form.Field error={errors.descNO}>
                        <label className="form-field-title"> Norsk </label>
                        <TextArea error={errors.desc} placeholder='Maks 200 tegn' value={descNO}  onChange={e => { setDescNO(e.target.value); setErrors({ ...errors, descNO: false }) }}/>
                    </Form.Field>
                    <Form.Field error={errors.descEN}>
                        <label className="form-field-title"> Engelsk </label>
                        <TextArea error={errors.desc} placeholder='Maks 200 tegn' value={descEN} onChange={e => { setDescEN(e.target.value); setErrors({ ...errors, descEN: false }) }}/>
                    </Form.Field>
                </Form.Group>

                { /** STED  **/ }
                <Form.Group grouped className="form-input-group">
                    <Form.Field>
                        <label className="form-field-header"> Adresse </label>
                        <input 
                            value={address} 
                            onChange={e => {
                                    setAddress(e.target.value);
                                    if (googleMaps) { generateGoogleMaps(e.target.value); }
                                }
                            } 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                        { !googleMaps &&  
                            <div className="flex-row align-center">
                                <Button
                                    disabled={address.length < 3}
                                    content={'Generer lenke til Google maps'} 
                                    icon='map' labelPosition='left' 
                                    onClick={() => generateGoogleMaps(address)} 
                                    primary
                                /> 
                            </div> 
                        }
                    { googleMaps && 
                        <Button.Group className="margin-top-small">
                            <Button onClick={() => setGoogleMaps('')}>Fjern</Button>
                            <Button.Or text='' />
                            <Button primary> 
                                <a className="google-maps-link" href={googleMaps} rel="noopener noreferrer" target="_blank"> 
                                    Test lenken 
                                </a> 
                            </Button>
                        </Button.Group> 
                    }
                </Form.Group>

                { /** GROUPS **/}
                <Form.Group grouped className="form-input-group">
                    <label className={'form-field-header'}> Gjelder for gruppe(r): </label>
                    <Form.Field>
                        { availableGroups.map(group => 
                            <Checkbox key={group} 
                                label={group === 'all' ? 'Alle grupper' : `Gruppe ${group}`}
                                className={`group-checkbox ${group === 'all' ? 'full-width' : ''} ${errors.groups ? 'checkbox-error' : ''}`}
                                onClick={() => handleCheckbox(group)}
                                disabled={group !== 'all' && allGroupsSelected}
                                checked={allGroupsSelected || groups.indexOf(group) >= 0}
                            />)
                        }
                    </Form.Field>
                </Form.Group>

                { /** SUBMIT **/ }
                <Button onClick={() => cancelCallback()} className="full-width margin-bottom-small margin-top-medium">
                    Avbryt
                </Button>
                <Button primary type='submit' className="full-width margin-bottom-large">
                    Ferdig
                </Button>
            </Form>

        </div>
    );
};

export default CreateNewEvent;