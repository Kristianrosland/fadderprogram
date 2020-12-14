import React from 'react';
import { selectTime } from "../utils";

const Posts = ({ post, lang }) => {

    const showUrl = post.googleMaps && post.googleMaps.startsWith('https');
    const google_maps = post.googleMaps;

    

    return (
        <div className="sub-event">
            <div className="sub-event-time-and-title">
                <p className="sub-event-time"> { selectTime(post) } </p>
                <p className="sub-event-title"> { post.title } </p>
            </div>
            { showUrl && <a className="sub-event-address" href={google_maps} rel="noopener noreferrer" target="_blank"> { lang === 'NO' ? '(kart)' : '(map)' } </a> }
            
        </div>
    )

}

export default Posts;