import React from "react";
// import { Button } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContexts";
export default function UserProfile({match}) {
  const {currentUser} = useAuth();
  const image =`https://avatars.dicebear.com/api/male/${currentUser.email}.svg?mood[]=happy` ||"https://static.wixstatic.com/media/a86808_4b6288c72b6845a98503af781a4f51a0~mv2.png/v1/crop/x_0,y_13,w_350,h_323/fill/w_490,h_452,al_c,lg_1,q_85/no%20profile%20picture.webp";

  return (
    <div>
      <div class="card" style={{ width: 18 + "rem" }}>
        <img src={image} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{currentUser.email}</h5>
          <p class="card-text">Thanks for using this website.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Account created At: {currentUser.metadata.creationTime}
          </li>
          <li class="list-group-item">
            Last Sign In At: {currentUser.metadata.lastSignInTime}
          </li>
          {/* <li class="list-group-item">Account Verified: {JSON.stringify(currentUser.emailVerified).toUpperCase()}</li> */}
          <li class="list-group-item">
            Account Verified:{" "}
            {currentUser.emailVerified ? <b>Verified</b> : <b>Not Verified</b>}
          </li>
        </ul>
        <div class="card-body">
          <a href="/" class="card-link">
            Card link
          </a>
          <a href="/" class="card-link">
            Another link
          </a>
          {!currentUser.emailVerified && (
            <div class="alert alert-warning" role="alert">
              Please Verify Your Email: {currentUser.email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
