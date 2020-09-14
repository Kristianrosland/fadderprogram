import React, { useState } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import { Dropdown } from "semantic-ui-react";
import LocationFields from "./form-fields/LocationFields";

const AddPost = ({selectedGroups, setPostTitle}) => {

  const [titleNO, setTitle] = useState("");
  
  const groups = selectedGroups.map(g => ({
    text: "Gruppe " + g, 
    key:"Gruppe " + g, 
    value:"Gruppe " + g}))

  

  
  const [choosenOne, setChoosenGroup] = useState("");

  const [address, setAddress] = useState("");
  const [googleMaps, setGoogleMaps] = useState("");

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

  console.log(choosenOne);
  const obj = {titleNO: titleNO}
  setPostTitle(obj)
  return (
    <div>
      <SingleTextField
        text={titleNO}
        setText={setTitle}
        errors={errors}
        setErrors={setErrors}
      />
      <label>Velg gruppe</label>

      <Dropdown
        placeholder="Velg gruppe"
        fluid={true}
        search
        selection
        options={groups}
        onChange={(event, data) => setChoosenGroup(data.value)}
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
