import React, { useState, useEffect } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import LocationFields from "./form-fields/LocationFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "semantic-ui-react";

const AddPost = ({
  selectedGroups,
  post,
  updateCallback,
  deleteCallback,
}) => {
  let groups = selectedGroups.map((group) => ({
    text: "Gruppe " + group,
    key: "Gruppe " + group,
    value: group,
  }));

  /** Legger til en verdi for valg av ingen gruppe */
  groups.push({
    text: "Ingen gruppe",
    key: "Ingen gruppe",
    value: "-",
  });

  const [id] = useState(post.id);
  const [title, setTitle] = useState(post.title);
  const [startGroup, setGroup] = useState(post.startGroup);
  const [address, setAddress] = useState(post.address);
  const [googleMaps, setGoogleMaps] = useState(post.googleMaps);

  // Update post if title, startGroup, address or googleMaps change
  useEffect(
    () =>
      updateCallback({
        id: id,
        title: title,
        startGroup: startGroup,
        address: address,
        googleMaps: googleMaps,
      }),
    [id, title, startGroup, address, googleMaps], 
  );


  const [errors, setErrors] = useState({
    address: false,
    googleMaps: false,
    id: false,
    timeOnEveryPost: false,
    title: false,
  });

  return (
    <div>
      <div className="add-post-post-groups-and-title">
        <SingleTextField
          text={title}
          setText={setTitle}
          errors={errors}
          setErrors={setErrors}
        />
        <div className="dropdown">
          <label id="add-post-lable-velg-gruppe">Velg startgruppe</label>
          <Dropdown
            placeholder="Velg gruppe"
            value={startGroup}
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
