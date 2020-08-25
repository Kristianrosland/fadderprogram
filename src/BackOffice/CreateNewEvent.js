import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { translateDay, groupComparator } from "../Frontend/utils";
import CreateSubevents from "./CreateSubevents";
import "./createNewEvent.scss";
import TimeFields from "./form-fields/TimeFields";
import DayPicker from "./form-fields/DayPicker";
import TitleFields from "./form-fields/TitleFields";
import DescriptionFields from "./form-fields/DescriptionFields";
import LocationFields from "./form-fields/LocationFields";
import LinkFields from "./form-fields/LinkFields";
import GroupPicker from "./form-fields/GroupPicker";

const CreateNewEvent = ({
  editing,
  existingEvent = {},
  availableGroups,
  cancelCallback,
  submitCallback,
  updateCallback,
  submitSubeventCallback,
  deleteSubeventCallback,
  addressSuggestions,
}) => {
  // Denne syntaksen pakker ut existingEvent inn i alle variablene som står under. Ved å ha   = ""  bak så gir vi default-verdier til disse
  const {
    title_NO = "",
    title_EN = "",
    desc_NO = "",
    desc_EN = "",
    google_maps = "",
    start_time = "",
    end_time = "",
    day_NO = "",
    linkText_NO = "",
    linkText_EN = "",
  } = existingEvent;

  const [titleNO, setTitleNO] = useState(title_NO);
  const [titleEN, setTitleEN] = useState(title_EN);
  const [descNO, setDescNO] = useState(desc_NO);
  const [descEN, setDescEN] = useState(desc_EN);
  const [address, setAddress] = useState(
    existingEvent.address ? existingEvent.address : ""
  );
  const [googleMaps, setGoogleMaps] = useState(google_maps);
  const [linkTextNO, setLinkTextNO] = useState(linkText_NO);
  const [linkTextEN, setLinkTextEN] = useState(linkText_EN);
  const [link, setLink] = useState(
    existingEvent.link ? existingEvent.link : ""
  );
  const [startTimeHour, setStartTimeHour] = useState(
    start_time.length === 5 ? start_time.split(":")[0] : ""
  );
  const [startTimeMinute, setStartTimeMinute] = useState(
    start_time.length === 5 ? start_time.split(":")[1] : ""
  );
  const [endTimeHour, setEndTimeHour] = useState(
    end_time.length === 5 ? end_time.split(":")[0] : ""
  );
  const [endTimeMinute, setEndTimeMinute] = useState(
    end_time.length === 5 ? end_time.split(":")[1] : ""
  );
  const [groups, setGroups] = useState(
    existingEvent.groups
      ? existingEvent.groups
      : availableGroups.length === 1
      ? availableGroups
      : []
  );
  const [day, setDay] = useState(day_NO);
  const [errors, setErrors] = useState({
    titleNO: false,
    titleEN: false,
    descNO: false,
    descEN: false,
    day: false,
    address: false,
    timeStart: false,
    timeEnd: false,
    groups: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [addSubevents, setAddSubevents] = useState(false);

  const redStar = <span style={{ color: "red" }}>*</span>;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateFieldsAndSetErrors = (callback) => {
    const errs = {
      titleNO: titleNO === "",
      titleEN: titleEN === "",
      descNO: descNO === "",
      descEN: descEN === "",
      timeStart: startTimeHour.length !== 2 || startTimeMinute.length !== 2,
      timeEnd:
        endTimeHour !== "" &&
        (endTimeHour.length !== 2 || endTimeMinute.length !== 2),
      day:
        day === "" ||
        ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"].indexOf(
          day
        ) === -1,
      link: (linkTextEN.length !== 0 || linkTextNO.length !== 0) && !link,
      groups: groups.length === 0,
    };

    callback(errs);
    return !Object.keys(errs).some((key) => errs[key]);
  };

  const submit = () => {
    const formIsValid = validateFieldsAndSetErrors(setErrors);

    if (formIsValid) {
      setSubmitting(true);
      const isMentorBoard = availableGroups.indexOf("all") >= 0;
      const event = {
        title_NO: titleNO,
        title_EN: titleEN,
        desc_NO: descNO,
        desc_EN: descEN,
        day_NO: day,
        day_EN: translateDay(day),
        from_NO: isMentorBoard ? "fadderstyret" : "gruppeleder",
        from_EN: isMentorBoard ? "the mentor board" : "group leader",
        start_time: `${startTimeHour}:${startTimeMinute}`,
        groups: groups.sort(groupComparator),
      };

      if (address.length >= 3) {
        event.address = address;
      }
      if (endTimeHour.length === 2 && endTimeMinute.length === 2) {
        event.end_time = `${endTimeHour}:${endTimeMinute}`;
      }
      if (googleMaps && googleMaps.startsWith("https://")) {
        event.google_maps = googleMaps;
      }
      if (link) {
        event.link = link;
        if (linkTextNO) event.linkText_NO = linkTextNO;
        if (linkTextEN) event.linkText_EN = linkTextEN;
      }

      if (editing) {
        updateCallback({ ...event, id: existingEvent.id });
      } else {
        if (groups.indexOf("duplicate") >= 0) {
          availableGroups.forEach((g) => {
            if (g !== "all") {
              submitCallback({ ...event, groups: [g] });
            }
          });
        } else {
          submitCallback(event);
        }
      }
    }
  };

  const submitSubevent = (e) => {
    if (existingEvent) {
      submitSubeventCallback({ ...e, parent_event_id: existingEvent.id });
    }
  };

  return (
    <div className="flex-column create-event-wrapper">
      {addSubevents ? (
        <CreateSubevents
          existingEvents={
            existingEvent.subEvents ? existingEvent.subEvents : []
          }
          submitCallback={submitSubevent}
          cancelCallback={() => setAddSubevents(false)}
          deleteCallback={deleteSubeventCallback}
          addressSuggestions={addressSuggestions}
        />
      ) : (
        <React.Fragment>
          <div className="create-event-header">
            Legg til et nytt event. Felter merket med {redStar} er
            obligatoriske.
          </div>
          <Form
            className="create-event-form"
            onSubmit={submit}
            loading={!availableGroups || submitting}
          >
            {/** TITTEL  **/}
            <TitleFields
              titleNO={titleNO}
              setTitleNO={setTitleNO}
              titleEN={titleEN}
              setTitleEN={setTitleEN}
              errors={errors}
              setErrors={setErrors}
            />

            {/** DAG **/}
            <DayPicker
              day={day}
              setDay={setDay}
              errors={errors}
              setErrors={setErrors}
            />

            {/** TID **/}
            <TimeFields
              startTimeHour={startTimeHour}
              setStartTimeHour={setStartTimeHour}
              startTimeMinute={startTimeMinute}
              setStartTimeMinute={setStartTimeMinute}
              endTimeHour={endTimeHour}
              setEndTimeHour={setEndTimeHour}
              endTimeMinute={endTimeMinute}
              setEndTimeMinute={setEndTimeMinute}
              errors={errors}
              setErrors={setErrors}
            />

            {/** BESKRIVELSE  **/}
            <DescriptionFields
              descNO={descNO}
              setDescNO={setDescNO}
              descEN={descEN}
              setDescEN={setDescEN}
              errors={errors}
              setErrors={setErrors}
            />

            {/** STED  **/}
            <LocationFields
              address={address}
              setAddress={setAddress}
              googleMaps={googleMaps}
              setGoogleMaps={setGoogleMaps}
            />

            {/** LINK **/}
            <LinkFields
              link={link}
              setLink={setLink}
              linkTextNO={linkTextNO}
              setLinkTextNO={setLinkTextNO}
              linkTextEN={linkTextEN}
              setLinkTextEN={setLinkTextEN}
              errors={errors}
              setErrors={setErrors}
            />

            {/** GRUPPER **/}
            {availableGroups.length !== 1 && (
              <GroupPicker
                groups={groups}
                setGroups={setGroups}
                availableGroups={availableGroups}
                errors={errors}
                setErrors={setErrors}
                editing={editing}
              />
            )}

            {/** Denne vises kun dersom vi endrer på et event, ikke hvis vi oppretter **/}
            {editing && (
              <Button
                type="button"
                onClick={() => {
                  setAddSubevents(true);
                }}
                className="full-width margin-bottom-small margin-top-small"
                content="Legg til hendelser"
              />
            )}

            {/** CANCEL OG SUBMIT KNAPPER **/}
            <Button
              type="button"
              onClick={cancelCallback}
              className="full-width margin-bottom-small margin-top-medium"
              content="Avbryt"
            />
            <Button
              primary
              type="submit"
              className="full-width margin-bottom-large"
              content={editing ? "Lagre" : "Ferdig"}
            />
          </Form>
        </React.Fragment>
      )}
    </div>
  );
};

export default CreateNewEvent;
