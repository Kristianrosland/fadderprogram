import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const EventWithPosts = ({ selectedGroups, posts, setPosts }) => {
  const [currentPost, setCurrentPost] = useState([]);

  const [int, setInt] = useState(1); // skal egentlig være 0 men siden vi har en i "databasen fra før av tar vi 1"

  /** Henter ut ny informasjon om postene endres på etter at de er lagt i listen med poster */
  const updateOldPosts = (
    oldVersion,
    newTitle,
    newStartGroup,
    newAddress,
    newGoogleMaps,
    
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
      {/** Vis poster som er lagt til */}
      {posts.map((post, index) => (
        <AddPost
          selectedGroups={selectedGroups}
          setCurrentPost={setCurrentPost}
          updateOldInformationFunc={updateOldPosts}
          key={index}
          post={post}
          deleteCallback={deletePost}
        />
      ))}
      {/** Legg til ny post */}
      <AddPost
        selectedGroups={selectedGroups}
        setCurrentPost={setCurrentPost}
        updateOldInformationFunc={updateOldPosts}
        key={int}
        post={{ id: int, title: "", startGroup: "", address: "", googleMaps: "" }}
        deleteCallback={deletePost}
      />
      <div className="add-remove-subposts">
        <AddEventButton
          handleClick={() => {
            setInt(int + 1);
            setPosts([...posts, currentPost]);
          }}
        />
      </div>
      <br />
      <p>Poster:</p>
      {posts.map((post) => (
        <p key={post.id}>
          {post.startGroup} skal starte på {post.title} ({post.address})
        </p>
      ))}
    </div>
  );
};

export default EventWithPosts;
