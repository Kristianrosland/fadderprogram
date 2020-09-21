import React, { useState, useEffect } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import LocationFields from "./form-fields/LocationFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "semantic-ui-react"

const AddPost = ({
  selectedGroups,
  setCurrentPost,
  post,
  updateOldInformationFunc,
  deleteCallback,
}) => {
  const groups = selectedGroups.map((group) => ({
    text: "Gruppe " + group,
    key: "Gruppe " + group,
    value: "Gruppe " + group,
  }));

  const redStar = <span style={{ color: "red" }}>*</span>;

  // For å kunne oppdatere informasjonen til posten i parrent componenten.
  const oldInformation = post;

  const [id, setId] = useState(post.id); // skal komme fra databasen (?)
  const [title, setTitle] = useState(post.title);
  const [group, setGroup] = useState(post.group);
  const [address, setAddress] = useState(post.address);
  const [googleMaps, setGoogleMaps] = useState(post.googleMaps);

  // Oppdater currentPost hvis title, group, address eller googleMaps forandres
  useEffect(
    () =>
      setCurrentPost({
        id: id,
        title: title,
        group: group,
        address: address,
        googleMaps: googleMaps,
      }),
    [title, group, address, googleMaps]
  );

  console.log();

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

  return (
    <div>
      <div className="add-post-post-groups-and-title">
        <SingleTextField
          text={title}
          setText={setTitle}
          errors={errors}
          setErrors={setErrors}
          onChange={updateOldInformationFunc(
            oldInformation,
            title,
            group,
            address,
            googleMaps
          )}
        />
        <div className="dropdown">
          <label id="add-post-lable-velg-gruppe">Velg gruppe {redStar}</label>
          <Dropdown
            placeholder="Velg gruppe"
            value={group}
            fluid
            search
            selection
            options={groups}
            onChange={(_, data) => setGroup(data.value)}
          />
        </div>
        <FontAwesomeIcon
          className="trash-icon icon"
          icon={faTrashAlt}
          onClick={() => deleteCallback(post.id)}
        />
      </div>

      <LocationFields
        address={address}
        setAddress={setAddress}
        googleMaps={googleMaps}
        setGoogleMaps={setGoogleMaps}
      />
    </div>
  );
};

export default AddPost;
