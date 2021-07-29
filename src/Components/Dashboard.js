import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
// import UserVerificationToast from "./UserVerificationToast";
import { Button} from "react-bootstrap";
// import { auth } from "../Firebase";
import firebase from "../Firebase";
import { useAuth } from "../Contexts/AuthContexts";
import { Link} from "react-router-dom";
import UserContent from "./UserContent";
// import dayjs from "dayjs";
import axios from "axios";
import UserProfile from "./UserProfile";
export default function Dashboard() {
  const { currentUser } = useAuth();
  // const [show, setShow] = useState(true);
  // const ref = firebase.firestore().collection("products");
  const postRef = firebase.firestore().collection("posts").orderBy("time", "desc");
  // const postRef = firebase.firestore().collection("posts");

  // const [post, setPost] = useState();
  const [data, setData] = useState();

  const [posting, setPosting] = useState(false);
  //    Description variable
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");
  const [loading,setLoading]=useState(true);

  
  

  function getData() {
    postRef.onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
    setLoading(false);
  }

  

  const cleanInputs = () => {
    setTitle("");
    setDescription("");
  };

  function addData() {
    setPosting(true);
    const postRef = firebase.firestore().collection("posts");
    if (title.length === 0 || description.length === 0) {
      alert("Please make sure to not leave empty title and description ");
      setPosting(false);
    }
    else{
        const today = new Date();
        postRef.add({
          email: currentUser.email,
          title: title,
          description: description,
          time: today.getTime(),
          verified: currentUser.emailVerified,
          country: localStorage.getItem("country"),
          avatar:`https://avatars.dicebear.com/api/male/${currentUser.email}.svg?mood[]=happy` || "https://static.wixstatic.com/media/a86808_4b6288c72b6845a98503af781a4f51a0~mv2.png/v1/crop/x_0,y_13,w_350,h_323/fill/w_490,h_452,al_c,lg_1,q_85/no%20profile%20picture.webp",
        });
        cleanInputs();
        setTimeout(() => {
          setPosting(false);
        }, 1000);
    }

   
  }

  async function getCountry() {
    let data = await axios.get("https://api.db-ip.com/v2/free/self");
    let result = data.data;
    localStorage.setItem("country", result.countryCode);
    
  }



  
  useEffect(() => {
    getCountry();
    getData();
   
  }, []);


  if(loading) return(
    <div className="spinner-wrapper center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
)


  return (
    <div className="dashboard-wrapper">
      <div className="navBarWrapper">
        <NavBar />
      </div>

      <div className="flex-wrapper">
        <div className="dashboardContent">
          <div className="post-input">
            <input
              type="text"
              value={title}
              placeholder="Post Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={description}
              placeholder="Post your thoughts"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={addData} disabled={posting}> Post </Button>
          </div>
          {loading ? (
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            data &&
            data.map((d, i) => (
              <>
              
              <Link to={`/tweets/${d.email}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
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
            </Link>
            </>
            ))
          )}
        </div>
        <div className="profile mr-5">
          <UserProfile />
        </div>
      </div>

      
             
    </div>
  );
}
