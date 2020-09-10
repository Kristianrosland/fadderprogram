import React, { useState } from "react";
import TitleFields from "./form-fields/TitleFields";
import AddPost from "./AddPost";
import AddEventButton from "./AddEventButton";

const NewCreateSubEvents = (props) => {
    
    const [titleNO, setTitleNO] = useState("");
    const [titleEN, setTitleEN] = useState("");

    const addMoreAddPosts = ()=> {
        
    }

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
        <AddPost/>

        <AddEventButton
        />
    </div>
    )


}

export default NewCreateSubEvents;