import React, { useState, useEffect } from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { translateDay, groupComparator } from "../Frontend/utils";
import "./createNewEvent.scss";
import TimeFields from "./form-fields/TimeFields";
import DayPicker from "./form-fields/DayPicker";
import TitleFields from "./form-fields/TitleFields";
import DescriptionFields from "./form-fields/DescriptionFields";
import LocationFields from "./form-fields/LocationFields";
import LinkFields from "./form-fields/LinkFields";
import GroupPicker from "./form-fields/GroupPicker";
import EventWithPosts from "./EventWithPosts";
import uuid from "react-uuid";

const CreateNewEvent = ({
  editing,
  existingEvent = {},
  availableGroups,
  cancelCallback,
  submitCallback,
  updateCallback,
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

  /** Her er syntaxen til subeventene */
  const [posts, setPosts] = useState(
    existingEvent.posts
      ? existingEvent.posts
      : [
          {
            id: uuid(),
            title: "",
            startGroup: "",
            address: "",
            googleMaps: "",
          },
        ]
  );
  const [postTime, setPostTime] = useState(existingEvent.post_time ? existingEvent.post_time : "");
  const [startTimeHourPosts, setStartTimeHourPosts] = useState(
      existingEvent.start_time_posts ? existingEvent.start_time_posts.split(":")[0] : ""
  );
  const [startTimeMinutePosts, setStartTimeMinutePosts] = useState(
      existingEvent.start_time_posts ? existingEvent.start_time_posts.split(":")[1] : ""
  );
  /** *************************************************************************** */

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
    postGroupsAssigned: false,
    postStartTime: false,
    postTime: false,
    postTitle: false,
    postGroup: false,
  });
  const [submitting, setSubmitting] = useState(false);

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
      postGroupsAssigned: newSubeventPage && ( // Sjekk at alle grupper er tildelt en post
          groups.includes("all") ?
          availableGroups
              .filter(group => group !== "all")
              .some(group => !posts.map(post => post.startGroup)
              .includes(group)) :
          groups
              .some(group => !posts.map(post => post.startGroup)
              .includes(group))
      ),
      postStartTime: newSubeventPage && // Sjekk at starttid poster er fylt ut og ikke er før starttid event
          (startTimeHourPosts.length !== 2 ||
           startTimeMinutePosts.length !== 2 ||
          startTimeHourPosts < startTimeHour ||
          (startTimeHourPosts ===  startTimeHour && startTimeMinutePosts < startTimeMinute)),
      postTime: newSubeventPage && (postTime === "" || parseInt(postTime) < 0),
      postTitle: newSubeventPage && posts.some(post => post.title === ""),
      postGroup: newSubeventPage && posts.some(post => post.startGroup === ""),
    };

    callback(errs);
    return !Object.keys(errs).some((key) => errs[key]);
  };

  const submit = () => {
    const formIsValid = validateFieldsAndSetErrors(setErrors);

    if (formIsValid) {
      setSubmitting(true);
      const isMentorBoard = availableGroups.indexOf("all") >= 0;

      if (newSubeventPage) {
        fixOrderOnPosts();
      }

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
        posts: posts,
        post_time: postTime,
        start_time_posts: `${startTimeHourPosts}:${startTimeMinutePosts}`,
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

  /** State som sier om vi øsnker et event med subevents, for å kunne få opp en ny side */
  const [newSubeventPage, setNewSubeventPage] = useState(
    editing && existingEvent.posts[0].title !== "" // This is just a quick fix should be looked at later
  );
  const fixOrderOnPosts = () => {
    const getGroupOrder = () => {
      const order = [];
      posts.forEach((post) => order.unshift(post.startGroup));
      return order;
    };

    const assignGroupOrder = () => {
      const groupOrder = getGroupOrder();
      posts.forEach((post) => {
        while (groupOrder[0] !== post.startGroup) {
          groupOrder.push(groupOrder.shift());
        }
        post.order = [...groupOrder];
      });
    };
    assignGroupOrder();
  };

  return (
    <div className="flex-column create-event-wrapper">
        <React.Fragment>
          <div className="create-event-header">
            Legg til et nytt event. Felter merket med {redStar} er
            obligatoriske.
          </div>
          {/** *********************************************************** **/}

          <Form
            className="create-event-form"
            onSubmit={submit}
            loading={!availableGroups || submitting}
          >
            {/** *********************************************************** **/}

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
              />
            )}

            {/** for å få opp muligheten for å lage subevents **/}

            <Checkbox
              label={`Lag et arrangement med subeventes`}
              className="group-checkbox full-width margin-top-medium"
              defaultChecked={newSubeventPage}
              onChange={() =>
                newSubeventPage === false
                  ? setNewSubeventPage(true)
                  : setNewSubeventPage(false)
              }
            />

            {newSubeventPage && (
              <EventWithPosts
                selectedGroups={
                  groups.includes("all") ?
                  availableGroups.filter(group => group !== "all").sort(groupComparator) :
                  groups.sort(groupComparator)
                }
                posts={posts}
                setPosts={setPosts}
                postTime={postTime}
                setPostTime={setPostTime}
                startTimeHourPosts={startTimeHourPosts}
                setStartTimeHourPosts={setStartTimeHourPosts}
                startTimeMinutePosts={startTimeMinutePosts}
                setStartTimeMinutePosts={setStartTimeMinutePosts}
                errors={errors}
                setErrors={setErrors}
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
    </div>
  );
};

export default CreateNewEvent;
