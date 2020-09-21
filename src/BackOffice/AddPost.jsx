import React, { useState, useEffect } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import LocationFields from "./form-fields/LocationFields";
import GroupDropDown from "./form-fields/PostDropDown";

const AddPost = ({selectedGroups, setCurrentPost, updatePosts, post}) => {

  const groups = selectedGroups.map(
    group => ({
      text: "Gruppe " + group, 
      key:"Gruppe " + group, 
      value:"Gruppe " + group
    })
  )
  
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
      key: post.key,
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
      />

      <GroupDropDown
        groups={groups}
        group={group}
        setGroup={setGroup}
        errors={errors}
        setErrors={setErrors}
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
