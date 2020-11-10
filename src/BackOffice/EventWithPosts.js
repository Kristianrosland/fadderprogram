import React, { useCallback } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";
import uuid from "react-uuid";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "./ErrorLabel";
import TimeFieldsPost from "./form-fields/TimeFieldsPost";



const EventWithPosts = ({ selectedGroups, posts, setPosts, setPostTime, postTime, startTimeHourPosts, setStartTimeHourPosts, startTimeMinutePosts, setStartTimeMinutePosts, errors, setErrors }) => {
  const groupsInUse = posts.map(post => post.startGroup)
  const newPost = {
        id: uuid(),
        title: "",
        startGroup: "",
        address: "",
        googleMaps: "",
  }

  const redStar = <span style={{ color: "red" }}>*</span>;

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
      <label className="form-field-header">
        Tid på hver post (minutter){redStar}{" "}
      </label>
      <Form.Field error={errors.postTime}>
        {errors.postTime && <ErrorLabel textKey={"ERROR_POST_TIME"} />}
        <Input
          className="time-input"
          placeholder="00"
          value={ postTime }
          onChange={(_, data) => {
            setPostTime(data.value);
            setErrors({...errors, postTime: false})
          }}
          type="number"
          autoComplete="off"
        />
      </Form.Field>

      <Form.Field error={errors.postStartTime}>
        <TimeFieldsPost
          startTimeHour={startTimeHourPosts}
          setStartTimeHour={setStartTimeHourPosts}
          startTimeMinute={startTimeMinutePosts}
          setStartTimeMinute={setStartTimeMinutePosts}
          errors={errors}
          setErrors={setErrors}
        />
      </Form.Field>

      {errors.postGroupsAssigned && <ErrorLabel textKey={"ERROR_POST_GROUPS_ASSIGNED"} />}
      {/** Vis poster som er lagt til */}
      {posts.map((post) => (
        <AddPost
          selectedGroups={selectedGroups}
          key={post.id}
          post={post}
          updateCallback={updatePost}
          deleteCallback={deletePost}
          groupsInUse={groupsInUse}
          errors={errors}
          setErrors={setErrors}
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
