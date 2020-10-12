import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";
import uuid from "react-uuid";
import { Form, Input } from "semantic-ui-react";

const EventWithPosts = ({ selectedGroups, posts, setPosts, setPostTime, postTime }) => {
  const [currentPost, setCurrentPost] = useState([]);
  
  const [int, setInt] = useState(1); // skal egentlig være 0 men siden vi har en i "databasen fra før av tar vi 1"

  /** Henter ut ny informasjon om postene endres på etter at de er lagt i listen med poster */
  const updateOldPosts = (
    oldVersion,
    newTitle,
    newStartGroup,
    newAddress,
    newGoogleMaps
  ) => {
    oldVersion.title = newTitle;
    oldVersion.startGroup = newStartGroup;
    oldVersion.address = newAddress;
    oldVersion.googleMaps = newGoogleMaps;
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  return (
    <div>
      
      <Form.Field>
        <label className="form-field-header">
          {" "}
          Tid på hver post (minutter){" "}
        </label>
        <Input
          className="time-input"
          placeholder="00"
          value={postTime }
          onChange={(_, data) => {
            setPostTime(data.value);
          }}
          type="number"
          autoComplete="off"
        />
      </Form.Field>

      {/** Vis poster som er lagt til */}
      {posts.map((post) => (
        <AddPost
          selectedGroups={selectedGroups}
          setCurrentPost={setCurrentPost}
          updateOldInformationFunc={updateOldPosts}
          key={post.id}
          post={post}
          deleteCallback={deletePost}
        />
      ))}
      {/** Legg til ny post */}
      <AddPost
        selectedGroups={selectedGroups}
        setCurrentPost={setCurrentPost}
        updateOldInformationFunc={updateOldPosts}
        key={int} // mulig å få samme uuid som den nedenfor?
        post={{
          id: uuid(),
          title: "",
          startGroup: "",
          address: "",
          googleMaps: "",
        }}
        deleteCallback={deletePost}
      />
      <div className="add-subposts">
        <AddEventButton
          handleClick={() => {
            setInt(int + 1);
            setPosts([...posts, currentPost]);
            
          }}
        />
      </div>
    </div>
  );
};

export default EventWithPosts;
