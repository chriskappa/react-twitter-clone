import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import UserVerificationToast from "./UserVerificationToast";
import { Button, Toast, Spinner, Alert } from "react-bootstrap";
import { auth } from "../Firebase";
import firebase from "../Firebase";
import { useAuth } from "../Contexts/AuthContexts";
import { Link, useHistory } from "react-router-dom";
import UserContent from "./UserContent";
import dayjs from "dayjs";
import axios from "axios";
import UserProfile from "./UserProfile";
export default function Dashboard() {
  const { currentUser, logOut } = useAuth();
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const ref = firebase.firestore().collection("products");
  const postRef = firebase.firestore().collection("posts").orderBy("time", "desc");

  const [post, setPost] = useState();
  const [data, setData] = useState();
  const [fetch, setFetch] = useState(true);
  const [posting, setPosting] = useState(false);
  //    Description variable
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");


  
  async function handleLogout() {
    try {
      await logOut();
      history.push("/login");
    } catch (err) {
      alert(err);
    }
  }

  function getData() {
    postRef.onSnapshot((snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()));
    });
    setFetch(false);
  }

  const cleanInputs = () => {
    setTitle("");
    setDescription("");
  };

  function addData() {
    setPosting(true);
    const postRef = firebase.firestore().collection("posts");
    if (title.length == 0 || description.length == 0) {
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
          avatar:
            `https://avatars.dicebear.com/api/male/${currentUser.email}.svg?mood[]=happy` ||
            "https://static.wixstatic.com/media/a86808_4b6288c72b6845a98503af781a4f51a0~mv2.png/v1/crop/x_0,y_13,w_350,h_323/fill/w_490,h_452,al_c,lg_1,q_85/no%20profile%20picture.webp",
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
    console.log(localStorage.getItem("country"));
  }
  useEffect(() => {
    getCountry();
    //    localStorage.setItem('country',"")
    getData();
    console.log(data);
    console.log(dayjs().from);
  }, []);

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
          {fetch ? (
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            data &&
            data.map((d, i) => (
              <>
              {console.log(d)}
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
