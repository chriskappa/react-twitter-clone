import React,{useState,useEffect} from 'react'
import UserContent from './UserContent'
import firebase from 'firebase';
import NavBar from './NavBar';
export default function Tweets({match}) {
    // const ref =firebase.firestore().collection("posts").orderBy("time", "desc");
    const ref =firebase.firestore().collection("posts");
    const [data ,setData]= useState();
    const [loading ,setLoading]=useState(true)
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
            setLoading(false);
        })
    }
    useEffect(()=>{
        getData()
    },[])
    // <UserContent key={i} title={d.title} country={d.country} avatar={d.avatar} verified={d.verified} email={d.email?d.email:"cshostgr@yahoo.com"} post={d.description} time={d.time}/>
    
    if(loading) return(
        <div className="spinner-wrapper center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className="tweet-wrapper">
             <div className="navBarWrapper">
                 <NavBar />
            </div>
            {/* <NavBar /> */}
            <div class="alert alert-warning text-center tweets-alert"  role="alert">{`Tweets from user ${targetEmail}`}
            </div>
          
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
