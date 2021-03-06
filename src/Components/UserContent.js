import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import React from 'react'
dayjs.extend(relativeTime);

export default function UserContent({title,email,post,time,verified,country,avatar}) {

    const postTime = dayjs(time).fromNow();
    const username = email.match(/^([^@]*)@/)[1]; // Replacing @EmailHosting.com in order to create username and hide the email!

    return (
        <div className="userContent">
            {/* <img className="avatar" src="https://pbs.twimg.com/profile_images/1224193692933808130/ob8r0cv__400x400.jpg" alt="" /> */}
            {avatar?<img className="avatar" src={avatar} alt="User Avatar" />:<img className="avatar" src="https://pbs.twimg.com/profile_images/1224193692933808130/ob8r0cv__400x400.jpg" alt="User Avatar" />}
           
           <div className="userContent-title">
               <ul class="d-flex align-items-center justify-content-between">
                   <li>Posted By</li>
                   <li>User::<b>@{username}</b></li>
                   <li><img className="countryImage" src={`https://www.countryflags.io/${country}/flat/32.png`} alt="User Country Flag" /></li>
                   {/* <li><img className="countryImage" src={`https://www.countryflags.io/${country}/flat/32.png`} /></li> */}
                   <li>{postTime}</li>
                   
               </ul>
               <div className="midle-part">
                <li ><b>{title}</b></li>
                <p>{post}</p>
               </div>
               
               <div className="social-media">
                <span>1.1k</span>
                <span>1.3k</span>
                <span>32.1k</span>
               </div>
               
        </div>
           
           
           
        </div>
        
    )
}
