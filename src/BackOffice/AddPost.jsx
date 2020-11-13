import React, { useState, useEffect } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import LocationFields from "./form-fields/LocationFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import GroupDropDown from "./form-fields/GroupDropdown";

const AddPost = ({
  selectedGroups,
  post,
  updateCallback,
  deleteCallback,
  groupsInUse,
  errors,
  setErrors
}) => {
  const [id] = useState(post.id);
  const [title, setTitle] = useState(post.title);
  const [startGroup, setStartGroup] = useState(post.startGroup);
  const [address, setAddress] = useState(post.address);
  const [googleMaps, setGoogleMaps] = useState(post.googleMaps);

  let groups = selectedGroups.filter(g => g === startGroup || !groupsInUse.includes(g)).map((group) => ({
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

  return (
    <div>
      <div className="add-post-post-groups-and-title">
        <SingleTextField
          text={title}
          setText={setTitle}
          errors={errors}
        />
        <div className="dropdown">
          <GroupDropDown
            groups={groups}
            group={startGroup}
            setGroup={setStartGroup}
            errors={errors}
            setErrors={setErrors}
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
