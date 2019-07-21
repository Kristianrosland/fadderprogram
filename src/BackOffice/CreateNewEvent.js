import React, { useState, useRef } from 'react';
import { Form, TextArea, Button, Input, Checkbox } from 'semantic-ui-react';
import { translateDay, groupComparator } from '../Frontend/utils';
import ErrorLabel from './ErrorLabel';
import CreateSubevents from './CreateSubevents';
import './createNewEvent.scss';
import TimeInput from './TimeInput';

const CreateNewEvent = ({ editing, existingEvent = {}, availableGroups, cancelCallback, submitCallback, updateCallback, submitSubeventCallback, deleteSubeventCallback }) => {
    const { title_NO = '', title_EN = '', desc_NO = '', desc_EN = '', google_maps = '', start_time = '', end_time = '', day_NO = '', linkText_NO='', linkText_EN=''} = existingEvent;
    const [ titleNO, setTitleNO ] = useState(title_NO);
    const [ titleEN, setTitleEN ] = useState(title_EN);
    const [ descNO, setDescNO ] = useState(desc_NO);
    const [ descEN, setDescEN ] = useState(desc_EN);
    const [ address, setAddress ] = useState(existingEvent.address ? existingEvent.address : '');
    const [ googleMaps, setGoogleMaps ] = useState(google_maps);
    const [ linkTextNO, setLinkTextNO ] = useState(linkText_NO);
    const [ linkTextEN, setLinkTextEN ] = useState(linkText_EN);
    const [ link, setLink ] = useState(existingEvent.link ? existingEvent.link : '');
    const [ startTimeHour, setStartTimeHour ] = useState(start_time.length === 5 ? start_time.split(':')[0] : '')
    const [ startTimeMinute, setStartTimeMinute ] = useState(start_time.length === 5 ? start_time.split(':')[1] : '')
    const [ endTimeHour, setEndTimeHour ] = useState(end_time.length === 5 ? end_time.split(':')[0] : '')
    const [ endTimeMinute, setEndTimeMinute ] = useState(end_time.length === 5 ? end_time.split(':')[1] : '')
    const [ groups, setGroups ] = useState(existingEvent.groups ? existingEvent.groups : []);
    const [ day, setDay ] = useState(day_NO)
    const [ errors, setErrors ] = useState({ titleNO: false, titleEN: false, descNO: false, descEN: false, day: false, address: false, timeStart: false, timeEnd: false, groups: false })
    const [ submitting, setSubmitting ] = useState(false);
    const [ addSubevents, setAddSubevents ] = useState(false);

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
            titleNO: titleNO === '',
            titleEN: titleEN === '',
            descNO: descNO === '',
            descEN: descEN === '',
            timeStart: startTimeHour.length !== 2 || startTimeMinute.length !== 2,
            timeEnd: endTimeHour !== '' && (endTimeHour.length !== 2 || endTimeMinute.length !== 2),
            day: day === '' || ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'].indexOf(day) === -1,
            link: (linkTextEN.length !== 0 || linkTextNO.length !== 0) && !link,
            groups: groups.length === 0,
        };

        callback(errs);
        return !Object.keys(errs).reduce((acc, key) => errs[key] || acc, false);
    }

    const submit = () => {
        if (validateFieldsAndSetErrors(setErrors)) {
            setSubmitting(true);
            const isMentorBoard = availableGroups.indexOf('all') >= 0;
            const event = {
                title_NO: titleNO,
                title_EN: titleEN,
                desc_NO: descNO, 
                desc_EN: descEN,
                day_NO: day,
                day_EN: translateDay(day),
                from_NO: isMentorBoard ? 'fadderstyret' : 'gruppeleder',
                from_EN: isMentorBoard ? 'the mentor board' : 'group leader',
                start_time: `${startTimeHour}:${startTimeMinute}`,
                groups: groups.sort(groupComparator),
            };

            if (address.length >= 3) { event.address = address; }
            if (endTimeHour.length === 2 && endTimeMinute.length === 2) { event.end_time = `${endTimeHour}:${endTimeMinute}` }
            if (googleMaps && googleMaps.startsWith('https://')) { event.google_maps = googleMaps; }
            if (link) {
                event.link = link;
                if (linkTextNO) event.linkText_NO = linkTextNO;
                if (linkTextEN) event.linkText_EN = linkTextEN;
            }
            
            if (editing) {
                updateCallback({ ...event, id: existingEvent.id });
            } else {
                submitCallback(event);
            }
        }
    }

    const submitSubevent = e => {
        if (existingEvent) {
            submitSubeventCallback({ ...e, parent_event_id: existingEvent.id })
        }
    }

    return (
        <div className="flex-column create-event-wrapper">
            { addSubevents 
                ? <CreateSubevents existingEvents={existingEvent.subEvents ? existingEvent.subEvents : [] } submitCallback={submitSubevent} cancelCallback={() => setAddSubevents(false) } deleteCallback={deleteSubeventCallback} />
                : (<React.Fragment>
                    <div className="create-event-header"> 
                        Legg til et nytt event. Felter merket med {redStar} er obligatoriske. 
                    </div>
            <Form className="create-event-form" onSubmit={submit} loading={!availableGroups || submitting}>

                { /** TITTEL  **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Tittel {redStar} </label>
                    <Form.Field error={errors.titleNO}>
                        <label className="form-field-title"> Norsk </label>
                        { errors.titleNO && <ErrorLabel textKey={'ERROR_TITLE_NO'} /> }
                        <Input 
                            value={titleNO} 
                            onChange={e => { setTitleNO(e.target.value); setErrors({ ...errors, titleNO: false }) }} 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field error={errors.titleEN}>
                        <label className="form-field-title"> Engelsk </label>
                        { errors.titleEN && <ErrorLabel textKey={'ERROR_TITLE_EN'} /> }
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
                    { errors.day && <ErrorLabel textKey={'ERROR_DAY'} /> }
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
                    <Button.Group className="full-width margin-top-small">
                        <Button primary={day === 'søndag'} type='button' onClick={() => { setDay('søndag'); setErrors({ ...errors, day: false })}}> Søndag </Button>
                    </Button.Group>

                </Form.Field>

                { /** TID **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Tid </label>
                    <div className="flex-row">
                        <TimeInput
                            title='Start'
                            hour={startTimeHour}
                            minute={startTimeMinute}
                            setHour={e => { setTime(e, 'startTimeHour'); setErrors({ ...errors, timeStart: false })} }
                            setMinute={e => { setTime(e, 'startTimeMinute'); setErrors({ ...errors, timeStart: false })} }
                            error={errors.timeStart ? 'ERROR_START_TIME' : ''}
                            mandatory={redStar}
                            minuteRef={startTimeMinuteRef}
                        />
                        <TimeInput
                            title='End'
                            hour={endTimeHour}
                            minute={endTimeMinute}
                            setHour={e => { setTime(e, 'endTimeHour'); setErrors({ ...errors, timeEnd: false })} }
                            setMinute={e => { setTime(e, 'endTimeMinute'); setErrors({ ...errors, timeEnd: false })} }
                            error={errors.timeEnd ? 'ERROR_END_TIME' : ''}
                            mandatory={false}
                            containerStyle='margin-left-large'
                            minuteRef={endTimeMinuteRef}

                        />
                    </div>
                </Form.Group>

                { /** BESKRIVELSE  **/ }
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Beskrivelse {redStar} </label>
                    <Form.Field error={errors.descNO}>
                        <label className="form-field-title"> Norsk </label>
                        { errors.descNO && <ErrorLabel textKey={'ERROR_DESC_NO'} /> }
                        <TextArea error={errors.desc} value={descNO}  onChange={e => { setDescNO(e.target.value); setErrors({ ...errors, descNO: false }) }}/>
                    </Form.Field>
                    <Form.Field error={errors.descEN}>
                        <label className="form-field-title"> Engelsk </label>
                        { errors.descEN && <ErrorLabel textKey={'ERROR_DESC_EN'} /> }
                        <TextArea error={errors.desc} value={descEN} onChange={e => { setDescEN(e.target.value); setErrors({ ...errors, descEN: false }) }}/>
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
                                type='button'
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
                            <Button type='button' onClick={() => setGoogleMaps('')}>Fjern</Button>
                            <Button.Or text='' />
                            <Button type='button' primary onClick={() => window.open(googleMaps, '_blank')}> 
                                Test lenke
                            </Button>
                        </Button.Group> 
                    }
                </Form.Group>

                { /** LINK **/}
                <Form.Group grouped className="form-input-group">
                    <label className="form-field-header"> Lenke </label>
                    <Form.Field>
                        <label className="form-field-title"> Norsk tekst som vises </label>
                        <input 
                            value={linkTextNO} 
                            onChange={e => setLinkTextNO(e.target.value) } 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="form-field-title"> Engelsk tekst som vises </label>
                        <input 
                            value={linkTextEN} 
                            onChange={e => setLinkTextEN(e.target.value) } 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                    <Form.Field  error={errors.link}>
                        <label className="form-field-title"> Lenke </label>
                        { errors.link && <ErrorLabel textKey={'ERROR_LINK'} /> }
                        <input 
                            value={link} 
                            onChange={e => { setLink(e.target.value); setErrors({ ...errors, link: false }); }} 
                            type="text"
                            autoComplete="off"
                        />
                    </Form.Field>
                </Form.Group>

                { /** GROUPS **/ }
                <Form.Group grouped className="form-input-group">
                    <label className={'form-field-header'}> Gjelder for gruppe(r): {redStar} </label>
                    { errors.groups && <ErrorLabel textKey={'ERROR_GROUPS'} /> }
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

                { editing &&
                    <Button type='button' onClick={() => { setAddSubevents(true) }} className="full-width margin-bottom-small margin-top-small">
                        Legg til hendelser
                    </Button>
                }

                { /** SUBMIT **/ }
                <Button type='button' onClick={() => cancelCallback()} className="full-width margin-bottom-small margin-top-medium">
                    Avbryt
                </Button>
                <Button primary type='submit' className="full-width margin-bottom-large">
                    { editing ? 'Lagre' : 'Ferdig' } 
                </Button>
            </Form>
            </React.Fragment>)
            }
        </div>
    );
};

export default CreateNewEvent;