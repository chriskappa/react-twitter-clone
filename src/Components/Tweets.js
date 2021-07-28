import React,{useState,useEffect} from 'react'
import UserContent from './UserContent'
import firebase from 'firebase';
import NavBar from './NavBar';
export default function Tweets({match}) {
    // const ref =firebase.firestore().collection("posts").orderBy("time", "desc");
    const ref =firebase.firestore().collection("posts");
    const [data ,setData]= useState();
    console.log(ref);
    console.log(match.params.email)
    const targetEmail = match.params.email 
    console.log(`target email is ${targetEmail}`)
    const getData = ()=>{
        ref.where("email","==", targetEmail).get()
        .then( snap =>{
            // setData(snap.docs.map(doc=>{console.log(doc.data())}))
            setData(snap.docs.map((doc) => doc.data()));
            console.log("data set")
        })
    }
    useEffect(()=>{
        getData()
    },[])
    // <UserContent key={i} title={d.title} country={d.country} avatar={d.avatar} verified={d.verified} email={d.email?d.email:"cshostgr@yahoo.com"} post={d.description} time={d.time}/>
    
    return (
        <div className="tweet-wrapper">
            <NavBar />
            <h1>{`Tweet from user ${targetEmail}`}</h1>
            {
            data &&
            data.map((d, i) => (
            
        
              
                <UserContent
                  key={i}
                  title={d.title}
                  country={d.country}
                  avatar={d.avatar}
                  verified={d.verified}
                  email={d.email?d.email:"cshostgr@yahoo.com"}
                  post={d.description}
                  time={d.time}
                />
        
            
          
            ))
}   
            
        </div>
    )
}
