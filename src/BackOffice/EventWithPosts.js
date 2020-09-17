import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const EventWithPosts = ({selectedGroups}) => {
    
    const [currentPost, setCurrentPost] = useState([])
    const [posts, setPosts] = useState([{title:"Heidis", group: NaN, address:"Håkonsgaten 27", googleMaps:"https://www.google.com/maps/search/?api=1&query=Håkonsgaten 27, Bergen"}])

    /** Henter ut ny informasjon om postene endres på etter at de er lagt i listen med poster */
    const updateOldPosts = (oldVersion, newTitle, newGroup, newAddress, newGoogleMaps) => {
        oldVersion.title = newTitle;
        oldVersion.group = newGroup;
        oldVersion.address = newAddress;
        oldVersion.googleMaps = newGoogleMaps;
    }

    return (
        <div>
        
            { /** Vis poster som er lagt til */ }
            {posts.map((post,index) => 
                <AddPost 
                    selectedGroups={selectedGroups} 
                    setCurrentPost={setCurrentPost}
                    updateOldInformationFunc={updateOldPosts} 
                    key={index} 
                    post={post}
                />)
            }

            { /** Legg til ny post */ }
            <AddPost 
                selectedGroups={selectedGroups} 
                setCurrentPost={setCurrentPost} 
                updateOldInformationFunc={updateOldPosts} 
                key={posts.length} 
                post={{title:"", group:"", address:"", googleMaps:""}}
            />

            <AddEventButton handleClick={ () => setPosts([...posts, currentPost]) }/>

            <br/>
            <p>Poster:</p>
            {posts.map(post => 
                <p key={post.group}>
                    {post.group} skal starte på {post.title} ({post.address})
                </p>)
            }
            
        </div>
    )


}

export default EventWithPosts;