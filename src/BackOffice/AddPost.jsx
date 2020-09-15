import React, { useState } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import { Dropdown } from "semantic-ui-react";
import LocationFields from "./form-fields/LocationFields";
import { useEffect } from "react";

const AddPost = ({selectedGroups, setCurrentPost, post, updateOldInformationFunc}) => {

  const groups = selectedGroups.map(
    group => ({
      text: "Gruppe " + group, 
      key:"Gruppe " + group, 
      value:"Gruppe " + group
    })
  )

  // For å kunne oppdatere informasjonen til posten i parrent componenten.
  const oldInformation = post;
  
  const [title, setTitle] = useState(post.title);
  const [group, setGroup] = useState(post.group);
  const [address, setAddress] = useState(post.address);
  const [googleMaps, setGoogleMaps] = useState(post.googleMaps);

  // Oppdater currentPost hvis title, group, address eller googleMaps forandres
  useEffect(() =>
    setCurrentPost({
      title: title,
      group: group,
      address: address,
      googleMaps: googleMaps,
    }),
    [title, group, address, googleMaps]
  )


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
      <SingleTextField
        text={title}
        setText={setTitle}
        errors={errors}
        setErrors={setErrors}
        onChange={updateOldInformationFunc(oldInformation, title, group, address, googleMaps)}
      />

      <label>Velg gruppe</label>
      <Dropdown
        placeholder="Velg gruppe"
        value={group}
        fluid
        search
        selection
        options={groups}
        onChange={(_, data) => setGroup(data.value)}
      />

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
