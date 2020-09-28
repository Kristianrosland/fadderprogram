import { useState } from "react";

const MakePostSubEvents = ({ posts, groups }) => {
    [subEvents, setSubEvents] = useState([])

    const CreateSubEvents = () => {
        groups.forEach(
            group => {
                setSubEvents(...subEvents, {
                    group: group,
                    posts: postsInOrder(group)
            });
        });
    };

    const postsInOrder = (group) => {
        return posts.slice(groups.indexOf(group), groups.length).concat(
               posts.slice(0, groups.indexOf(group)))
    };

}

/**********************************************************

OUTPUT

ALTERNATIV 1

[
    {
        title_NO: "Bar til bar"
        .
        .
        .
        from_NO: "fadderstyret"
        groups: [12]
        posts: [
            {id: ..., title: "Ricks",   adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Bryggen", adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Heidis",  adress: ..., googlemaps: ..., startTime: ...}
        ]
    },
    {
        title_NO: "Bar til bar"
        .
        .
        .
        from_NO: "fadderstyret"
        groups: [18]
        posts: [
            {id: ..., title: "Bryggen", adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Heidis",  adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Ricks",   adress: ..., googlemaps: ..., startTime: ...}
        ]
    },
    {
        title_NO: "Bar til bar"
        .
        .
        .
        from_NO: "fadderstyret"
        groups: [23]
        posts: [
            {id: ..., title: "Heidis",  adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Ricks",   adress: ..., googlemaps: ..., startTime: ...},
            {id: ..., title: "Bryggen", adress: ..., googlemaps: ..., startTime: ...}
        ]
    },
]

ALTERNATIV 2

{
    title_NO: "Bar til Bar",
    title_EN: "Bar to Bar",
    desc_NO: "Bar til bar",
    desc_EN: "Bar to bar",
    day_NO: "onsdag",
    day_EN: "wednesday",
    day_NO: "onsdag",
    desc_EN: "Bar to bar",
    desc_NO: "Bar til bar",
    from_EN: "the mentor board",
    from_NO: "fadderstyret",
    groups: ["12", "18", "23"],
    posts: [
        {id: ..., title: "Heidis", startGroup: "12", address: ..., googleMaps: ..., rekkefølge: ["12", "23", "18"]}
        {id: ..., title: "Fincken", startGroup: "18", address: ..., googleMaps: ..., rekkefølge: ["18", "12", "23"]}
        {id: ..., title: "Fincken", startGroup: "23", address: ..., googleMaps: ..., rekkefølge: ["23", "18", "12"]}
    ],
    start_time: "17:00",
    title_EN: "Bar to Bar",
    title_NO: "Bar til Bar",
}
**********************************************************/

export default MakePostSubEvents;