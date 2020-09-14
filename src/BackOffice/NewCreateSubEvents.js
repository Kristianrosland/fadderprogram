import React, { useState } from "react";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const NewCreateSubEvents = ({selectedGroups}) => {
    

    const [posts, setPosts] = useState([])

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
    
    console.log(posts, "This is posts");

    return (
        <div>
            
        {posts.map((post,index) => 
            <AddPost 
            selectedGroups={selectedGroups} 
            setPostTitle={} 
            key={index} 
            />)}

        <AddEventButton handleClick={() => { setPosts([...posts, { title: "new Post"}]) }} />
    </div>
    )


}

export default NewCreateSubEvents;