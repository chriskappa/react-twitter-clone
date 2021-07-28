import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import React from 'react'
dayjs.extend(relativeTime);

export default function UserContent({title,email,post,time,verified,country}) {

    const postTime = dayjs(time).fromNow();
    console.log(country);
    return (
        <div className="userContent">
            <img src="https://pbs.twimg.com/profile_images/1224193692933808130/ob8r0cv__400x400.jpg" alt="" />
           
           <div className="userContent-title">
               <ul>
                   <li><b>{title}</b></li>
                   {verified&&<li className="img-verify"><img src="https://png.pngtree.com/element_our/png/20181205/valid-vector-icon-png_260889.jpg" className="img-verify" alt="" /></li>}
                   <li>@{email}</li>
                   {/* <li>{time?time:"No Time"} ago</li> */}
                   <li><img src={`https://www.countryflags.io/${country}/flat/64.png`} /></li>
                   <li>{postTime}</li>
               </ul>
               <p>{post}</p>
               <div className="social-media">
                <span>1.1k</span>
                <span>1.3k</span>
                <span>32.1k</span>
               </div>
               
        </div>
           
           
           
        </div>
        
    )
}
