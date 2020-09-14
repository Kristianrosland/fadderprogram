import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const EventWithPosts = ({selectedGroups}) => {
    
    const [currentPost, setCurrentPost] = useState([])
    const [posts, setPosts] = useState([])

    return (
        <div>
        
            { /** Vis poster som er lagt til */ }
            {posts.map((post,index) => 
                <AddPost 
                    selectedGroups={selectedGroups} 
                    setCurrentPost={setCurrentPost} 
                    key={index} 
                    post={post}
                />)
            }

            { /** Legg til ny post */ }
            <AddPost 
                selectedGroups={selectedGroups} 
                setCurrentPost={setCurrentPost} 
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