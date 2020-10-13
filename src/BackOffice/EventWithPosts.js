import React, { useCallback, useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";
import uuid from "react-uuid";
import { Form, Input } from "semantic-ui-react";

const EventWithPosts = ({ selectedGroups, posts, setPosts, setPostTime, postTime }) => {

  const newPost = {
        id: uuid(),
        title: "",
        startGroup: "",
        address: "",
        googleMaps: "",
        timeOnEveryPost: ""
  }

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const updatePost = (newPost) => {
    const newPosts = [...posts];
    for (let index in newPosts) {
      if (newPosts[index].id === newPost.id) {
        newPosts[index] = newPost;
      }
    }
    setPosts(newPosts);
  }

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
          key={post.id}
          post={post}
          updateCallback={updatePost}
          deleteCallback={deletePost}
        />
      ))}
      <div className="add-subposts">
        <AddEventButton
          handleClick={() => { 
            setPosts([...posts, {...newPost}]);
          }}
        />
      </div>
    </div>
  );
};

export default EventWithPosts;
