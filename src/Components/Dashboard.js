import React ,{useContext,useEffect,useState} from 'react'
import NavBar from './NavBar';
import UserVerificationToast from './UserVerificationToast';
import {Button,Toast,Spinner} from 'react-bootstrap';
import { auth } from '../Firebase';
import firebase from '../Firebase';
import {useAuth} from '../Contexts/AuthContexts';
import {Link, useHistory} from 'react-router-dom';
import UserContent from './UserContent';
import dayjs from 'dayjs';
import axios from 'axios';
export default function Dashboard() {
  
   const {currentUser , logOut} = useAuth();
   const [show , setShow]=useState(true);
   const toggleShow = () =>setShow(!show);
   const history = useHistory();
   const ref = firebase.firestore().collection("products");
   const postRef = firebase.firestore().collection("posts").orderBy("time", "desc");
   

   const [post ,setPost]=useState();
   const [data , setData] = useState();
   const [fetch , setFetch]=useState(true);

//    Description variable
   const [description,setDescription] = useState('');

   const [title ,setTitle]=useState('');

  
    async function handleLogout(){
        try{
            await logOut();
            history.push("/login");
        }
        catch(err){
            alert(err);
        }
    }

    function getData(){
    
        postRef.onSnapshot(snapshot =>{
            setData(snapshot.docs.map(doc=>doc.data()))
         })
         setFetch(false);
    }

  




    function addData(){
        const postRef= firebase.firestore().collection("posts");
                if(!currentUser.emailVerified ){
                    alert("Please Verify your account to have the verify badge")
                }
                const today = new Date();
                postRef.add({
                    email:currentUser.email,
                    title:title,
                    description:description,
                    time:today.getTime(),
                    verified:currentUser.emailVerified,
                    country:localStorage.getItem('country')
                })
               
                
           
        
    
    }


    async function getCountry(){
        
        let data = await axios.get("https://api.db-ip.com/v2/free/self")
        let result = data.data;
        localStorage.setItem('country',result.countryCode)
        console.log(localStorage.getItem('country'))
    }
    useEffect(()=>{
       getCountry();
    //    localStorage.setItem('country',"")
       getData()
       console.log(data);
       console.log(dayjs().from);
    },[])

   

  
    return (
        <div className="dashboard-wrapper">
            <div className="navBarWrapper">
            <NavBar/>
        </div>
       
       <div className="post-input">
           <input type="text" value={title}placeholder="Post Title" onChange={e=>setTitle(e.target.value)}/>
           <input type="text" value={description }placeholder="Post your thoughts" onChange={e=>setDescription(e.target.value)}/>
           <Button onClick={addData}>Post</Button>
       </div>

        {/* <div className="dashboardContent">

               
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
                   <UserContent />
               
        </div> */}

        <div className="dashboardContent">

        {data &&data.map((d,i) => <UserContent key={i}title={d.title} country={d.country} verified={d.verified}email={d.email} post={d.description} time={d.time}/>)}

        </div>
            {/* Toast */}
            {/* <Toast show={show} onClose={toggleShow} delay={3000} autohide>
                    <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="me-auto">Sucessfuly Registered</strong>
                            <small>2 seconds ago</small>
                    </Toast.Header>
                    <Toast.Body>{`${currentUser.email} Please Verify your email`}</Toast.Body>
                </Toast> */}
            {/* End of Toast */}

        {/* <div className="dashboardContent">
            
            
            <h1><span class="">Hello User</span> {currentUser.email}</h1>
            
            

            {!fetch &&  data ? data.map((data,i)=>(
            
                    <>
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                        <h1>{data.price}</h1>
                    </>
                    
                
                
            )): <> <Spinner animation="border" variant="primary" class="ml 10" /> <h5>Loading....</h5></>}
            <Button onClick={addData}>ADD</Button>
        </div> */}
        </div>
        
    )
}
