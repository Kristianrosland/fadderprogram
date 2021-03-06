import React, { useState } from "react";
import { selectField, selectTime, selectGroups } from "../Frontend/utils";
import SelectLanguage from "../Frontend/SelectLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faTimes,
  faTrashAlt,
  faPen,
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

const CheckLabel = ({ check, label }) => {
  const icon = check ? faCheck : faTimes;
  const cx = ["check-label-wrapper", check ? "check-green" : "times-red"].join(
    " "
  );

  return (
    <div className={cx}>
      <FontAwesomeIcon icon={icon} />
      <label> {label} </label>
    </div>
  );
};



const EditableEvent = ({ event, canManage, deleteCallback, editCallback }) => {
  let [lang, setLang] = useState("NO");
  const changeLanguage = () => setLang(lang === "NO" ? "EN" : "NO");
  let [showDescription, setShowDescription] = useState(false);
  const changeShowDescription = () => setShowDescription(!showDescription);

  const title = selectField(event, "title", lang)
    ? selectField(event, "title", lang)
    : `Tittel mangler (${lang})`;
  const time = selectTime(event);
  const groups = selectGroups(event, lang);
  const allFieldsEnglish =
    event.title_EN && event.from_EN && event.day_EN && event.desc_EN;
  const hasAddress = event.address && event.address.length > 0;
  const hasGoogleMaps =
    event.google_maps && event.google_maps.startsWith("https");
  const description = selectField(event, "desc", lang)
    ? selectField(event, "desc", lang)
    : `Beskrivelse mangler (${lang})`;

  return (
    <div className="editable-event-wrapper">
      <div className="title-language-wrapper">
        <label className="editable-event-title">{title}</label>
        <SelectLanguage
          state={{ lang: lang }}
          changeLanguage={changeLanguage}
          position="relative"
        />
      </div>
      <label className="editable-event-info-label">{groups}</label>
      <label className="editable-event-info-label">{time}</label>
      {event.address && (
        <label className="editable-event-info-label">
          Addresse: {event.address}
        </label>
      )}
      
      {showDescription && (
        <label className="editable-event-info-label">
          Beskrivelse: {description}
        </label>
      )}
      {showDescription && (
          event.posts.map(post => (
            <label className="editable-event-info-label" key={post.id}>
              {post.title}
            </label>
          )))}

      <div className="flex-row bottom-row">
        {hasAddress && (
          <CheckLabel
            check={hasGoogleMaps}
            label={hasGoogleMaps ? "Har google maps" : "Mangler google maps"}
          />
        )}
        {!hasAddress && (
          <CheckLabel check={hasAddress} label="Mangler adresse" />
        )}
        {!allFieldsEnglish && (
          <CheckLabel check={allFieldsEnglish} label="Mangler oversettelse" />
        )}
        
        
          <FontAwesomeIcon
            className="show-description-icon icon"
            icon={showDescription ? faAngleDoubleUp : faAngleDoubleDown}
            onClick={() => changeShowDescription()}
          />
          <div>
          {canManage && (
            <FontAwesomeIcon
              className="trash-icon icon"
              icon={faTrashAlt}
              onClick={() => deleteCallback(event.id)}
            />
          )}
          {canManage && (
            <FontAwesomeIcon
              className="pen-icon icon"
              icon={faPen}
              onClick={() => editCallback(event.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableEvent;
