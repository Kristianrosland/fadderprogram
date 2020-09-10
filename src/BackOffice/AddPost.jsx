import React, { useState } from "react";
import SingleTextField from "./form-fields/SingleTextField";
import {Dropdown} from "semantic-ui-react";
import LocationFields from "./form-fields/LocationFields";

const AddPost = () => {


    const [descNO, setDescNO] = useState("")
    const groups = [ //https://react.semantic-ui.com/modules/dropdown/#types-search-selection
        {text:"Gruppe 1 - Informatikk", key: "Gruppe 1 - Informatikk key", value: "Gruppe 1 - Informatikk value"}, 
        {text:"Gruppe 2", key: "Gruppe 2", value:"Gruppe 2"}, 
        {text:"Gruppe 3", key: "Gruppe 3", value:"Gruppe 3"}
    ]
    const [address, setAddress] = useState("");
    const [googleMaps, setGoogleMaps] = useState("");

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

return(
    <div>
        <SingleTextField
        descNO = {descNO}
        setDescNO = {setDescNO}
        errors = {errors}
        setErrors = {setErrors}
        />
        <label>Velg gruppe</label>
        <Dropdown
        placeholder = 'Velg gruppe'
        fluid
        search
        selection
        options={groups}
        />

        <LocationFields
        address = {address}
        setAddress = {setAddress}
        googleMaps = {googleMaps}
        setGoogleMaps = {setGoogleMaps}
        />
    </div>
)

    
}

export default AddPost;