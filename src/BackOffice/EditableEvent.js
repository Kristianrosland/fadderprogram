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
  let [showMore, setShowMore] = useState(false);
  const changeShowMore = () => setShowMore(showMore === false ? true : false);

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

  const showLessFunc = () => {

  }

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
      {console.log(event)}
      {console.log(description)}

      <label className="editable-event-info-label">
        {!showMore ? (
          <FontAwesomeIcon
            className="showMore"
            icon={faAngleDoubleDown}
            onClick={() => changeShowMore()}
          />
          
        ): "Beskrivelse: " + description }
        {showMore && (
        <FontAwesomeIcon
            className="showMore"
            icon={faAngleDoubleUp}
            onClick={() => changeShowMore()}
          />)}

      </label>

      <div className="flex-row">
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
        {canManage && (
          <FontAwesomeIcon
            className="trash-icon"
            icon={faTrashAlt}
            onClick={() => deleteCallback(event.id)}
          />
        )}
        {canManage && (
          <FontAwesomeIcon
            className="pen-icon"
            icon={faPen}
            onClick={() => editCallback(event.id)}
          />
        )}
      </div>
    </div>
  );
};

export default EditableEvent;
