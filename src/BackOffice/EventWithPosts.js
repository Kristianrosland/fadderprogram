import React, { useCallback } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";
import uuid from "react-uuid";
import { Form, Input } from "semantic-ui-react";



const EventWithPosts = ({ selectedGroups, posts, setPosts, setPostTime, postTime, setStartTimePosts, startTimePosts }) => {
  const groupsInUse = posts.map(post => post.startGroup)
  const newPost = {
        id: uuid(),
        title: "",
        startGroup: "",
        address: "",
        googleMaps: "",
  }

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const updatePost = useCallback((newPost) => {
    const newPosts = [...posts];
    for (let index in newPosts) {
      if (newPosts[index].id === newPost.id) {
        newPosts[index] = newPost;
      }
    }
    setPosts(newPosts);
  }, [posts, setPosts])

  return (
    <div>
      
      <Form.Field>
        <label className="form-field-header">
          Tid på hver post (minutter){" "}
        </label>
        <Input
          className="time-input"
          placeholder="00"
          value={ postTime }
          onChange={(_, data) => {
            setPostTime(data.value);
          }}
          type="number"
          autoComplete="off"
        />
      </Form.Field>
      <Form.Field>
        <label className="form-field-header">
          Når ønsker du at postene skal starte (HH:MM){" "}
        </label>
        <Input
          className=""
          placeholder="00:00"
          value={startTimePosts}
          onChange={(_, data) => {
            setStartTimePosts(data.value)
          }}
          type="string"
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
          groupsInUse={groupsInUse}
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
