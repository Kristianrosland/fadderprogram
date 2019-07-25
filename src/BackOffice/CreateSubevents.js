import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import TimeInput from './TimeInput';
import { eventTimeComparator } from '../Frontend/utils';

const CreateSubevents = ({ existingEvents, submitCallback, cancelCallback, deleteCallback, addressSuggestions }) => {
    const [ addingNew, setAddingNew ] = useState(false);
    const [ startTime, setStartTime ] = useState({hours: '', minutes: ''})
    const [ endTime, setEndTime ] = useState({hours: '', minutes: ''})
    const [ titleNO, setTitleNO ] = useState('')
    const [ titleEN, setTitleEN ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ errors, setErrors ] = useState({ startTime: false, endTime: false, titleNO: false, titleEN: false, address: false });
    const [ googleMaps, setGoogleMaps ] = useState('')
    const [ suggestedAddress, setSuggestedAddress ] = useState(undefined);

    const startTimeMinuteRef = useRef();
    const endTimeMinuteRef = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleTimeInput = (f, t, event) => {
        const input = event.target.value;
        for (const c of input.split('')) { if (c < '0' || c > '9') return }
        if (input.length > 2 || parseInt(input) > (t === 'hours' ? 23 : 59)) return;

        
        if (f === 'start') {
            setErrors({ ...errors, startTime: false })
            if (t === 'hours') { if (input.length === 2) { startTimeMinuteRef.current.focus(); } setStartTime({ ...startTime, hours: input })}
            if (t === 'minutes') { setStartTime({ ...startTime, minutes: input })}
        } else {
            setErrors({ ...errors, endTime: false })
            if (t === 'hours') { if (input.length === 2) { endTimeMinuteRef.current.focus(); } setEndTime({ ...endTime, hours: input })}
            if (t === 'minutes') { setEndTime({ ...endTime, minutes: input })}
        }
    }

    const handleAddressInput = input => {
        setAddress(input);

        if (input.length >= 3) {
            if (input.toLowerCase().indexOf('bergen') === -1) { 
                input = input + ', Bergen' 
           }
   
           setGoogleMaps(`https://www.google.com/maps/search/?api=1&query=${input}`);
        } else {
            setGoogleMaps('');
        }
    }

    const handleFieldInput = (input, field) => {
        if (field === 'title_NO') {
            if (address.length === 0 && input.toLowerCase() in addressSuggestions) {
                setSuggestedAddress(addressSuggestions[input.toLowerCase()]);
            }
            setTitleNO(input);
            setErrors({ ...errors, titleNO: false });

        } else if (field === 'title_EN') {
            setTitleEN(input);
            setErrors({ ...errors, titleEN: false });
        }   
    }

    const blankOutForm = () => {
        setTitleNO('');
        setTitleEN('');
        setStartTime({ hours: '', minutes: ''})
        setEndTime({ hours: '', minutes: ''})
        setAddress('')
        setGoogleMaps('');
        setErrors({ startTime: false, endTime: false, titleNO: false, titleEN: false, address: false });
    }

    const cancelAdding = () => {
        setAddingNew(false);
        blankOutForm();
    }

    const validate = () => {
        const errors = { 
            titleNO: titleNO.length === 0,
            titleEN: titleEN.length === 0,
            startTime: startTime.hours.length !== 2 || startTime.minutes.length !== 2,
            endTime: endTime.hours.length === 1 || (endTime.hours.length === 2 && endTime.minutes.length !== 2),
            address: address.length > 0 && address.length < 3,
         };

         setErrors(errors);
         return !Object.keys(errors).reduce((acc, key) => errors[key] || acc, false);
    }

    const validateAndSubmit = () => {
        if (validate()) {
            const event = {
                title_NO: titleNO,
                title_EN: titleEN,
                start_time: `${startTime.hours}:${startTime.minutes}`,
            };

            if (address.length !== 0) { event.address = address; }
            if (googleMaps.length !== 0) { event.google_maps = googleMaps; }
            if (endTime.hours.length === 2 && endTime.minutes.length === 2) { event.end_time =  `${endTime.hours}:${endTime.minutes}`; }

            submitCallback(event)
            setAddingNew(false);
            blankOutForm();
        }
    }

    return (
        <div className="flex-column align-center add-sub-event-wrapper">
            { existingEvents.sort(eventTimeComparator).map(e => (
                <div key={e.id} className={`${addingNew ? 'mobile-excluded' : ''} margin-top-medium flex-row existing-subevent`}>
                    <label className="margin-left-medium sub-event-time-label"> { e.start_time } – { e.end_time } </label>
                    <div className="margin-left-medium flex-column sub-event-title-wrapper"> 
                        <label className="sub-event-title-label"> NO: { e.title_NO } </label> 
                        <label className="sub-event-title-label"> EN: { e.title_EN } </label> 
                    </div>
                    <label className="sub-event-google-maps"> { e.google_maps } </label>
                    <FontAwesomeIcon className="sub-event-trash" icon={faTrashAlt} onClick={() => deleteCallback(e.id)} />
                </div>
            ))}
            
            { !addingNew && <Button type='button' className="margin-top-large full-width" onClick={cancelCallback}>
                Tilbake
            </Button>}
            { !addingNew && <Button type='button' primary className="margin-top-small margin-bottom-large full-width" onClick={() => { setAddingNew(true) }}> Legg til nytt event </Button> }
            { addingNew && 
                <Form className="subevent-form">
                    <div className="flex-column margin-top-large">
                        <div className="flex-row">
                            <TimeInput 
                                title='Start'
                                hour={startTime.hours}
                                minutes={startTime.minutes}
                                setHour={e => handleTimeInput('start', 'hours', e)}
                                setMinute={e => handleTimeInput('start', 'minutes', e)}
                                error={errors.startTime ? 'ERROR_START_TIME' : ''}
                                mandatory={<span style={{ color: 'red' }}>*</span>}
                                minuteRef={startTimeMinuteRef}
                                />
                            <TimeInput 
                                title='Slutt'
                                hour={endTime.hours}
                                minutes={endTime.minutes}
                                setHour={e => handleTimeInput('end', 'hours', e)}
                                setMinute={e => handleTimeInput('end', 'minutes', e)}
                                containerStyle="margin-left-medium"
                                error={errors.endTime ? 'ERROR_END_TIME' : ''}
                                minuteRef={endTimeMinuteRef}
                            />
                        </div>

                        <Form.Field error={errors.titleNO}>
                            <label className="form-field-title margin-top-large"> Norsk tittel </label>
                            <Input 
                                value={titleNO} 
                                onChange={e => { handleFieldInput(e.target.value, 'title_NO'); }} 
                                type="text"
                                autoComplete="off"
                            />
                        </Form.Field>

                        <Form.Field error={errors.titleEN}>
                            <label className="form-field-title margin-top-small"> Engelsk tittel </label>
                            <Input 
                                value={titleEN} 
                                onChange={e => { handleFieldInput(e.target.value, 'title_EN'); }} 
                                type="text"x
                                autoComplete="off"
                            />
                        </Form.Field>

                        <Form.Field error={errors.address}>
                            <label className="form-field-title margin-top-large"> Adresse </label>
                            { suggestedAddress && <label style={{color: 'blue', textDecoration: 'underline'}} onClick={() => { handleAddressInput(suggestedAddress); setSuggestedAddress(undefined); }}> Bruk foreslått adresse: {suggestedAddress} </label>}
                            <Input 
                                value={address} 
                                onChange={e => { handleAddressInput(e.target.value); setErrors({ ...errors, address: false }) }} 
                                type="text"
                                autoComplete="off"
                            />
                            { googleMaps &&  <Button className="test-link-button" type='button' primary onClick={() => window.open(googleMaps, '_blank')}> Test lenke </Button> }
                        </Form.Field>
                        <Button type='button' secondary className="margin-top-small" onClick={cancelAdding}>
                            Avbryt
                        </Button>
                        <Button type='submit' primary className="margin-top-small margin-bottom-large" onClick={validateAndSubmit}>
                            Ferdig
                        </Button>
                    </div>
                </Form>
            }
        </div>
    );
};

export default CreateSubevents;