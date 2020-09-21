import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const EventWithPosts = ({selectedGroups}) => {
    
    const [currentPost, setCurrentPost] = useState({})
    const [posts, setPosts] = useState([])

    return (
        <div>
        
            { /** Vis poster som er lagt til */ }
            {posts.map((post,index) => 
                <AddPost 
                    selectedGroups={selectedGroups} 
                    setCurrentPost={setCurrentPost} 
                    updatePosts={updatePosts}
                    key={post.key} 
                    post={post}
                />)
            }

            { /** Legg til ny post */ }
            <AddPost 
                selectedGroups={selectedGroups} 
                setCurrentPost={setCurrentPost} 
                updatePosts={updatePosts}
                key={nextKey} 
                post={{title:"", group:"", address:"", googleMaps:"", key:nextKey}}
            />

            <AddEventButton handleClick={ () => { setPosts([...posts, currentPost]); setNextKey(nextKey + 1) } }/>

            <br/>
            <p>Poster:</p>
            {posts.map(post => 
                <p key={post.group}>
                    {post.group} skal starte på {post.title} ({post.address}) og har key {post.key}
                </p>)
            }
            
        </div>
    )


}

export default EventWithPosts;