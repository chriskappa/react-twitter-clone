import React from "react";
import { useAuth } from "../Contexts/AuthContexts";
import { Button } from "react-bootstrap";
export default function NavBar() {
  const { currentUser, logOut } = useAuth();
  const userEmail = currentUser.email;
  const userName = userEmail.match(/^([^@]*)@/)[1];
  console.log("here",userEmail,userName);
  function logUserOut() {
    try {
      logOut();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div className="navBarItems">
      <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a class="navbar-brand" href="#"> Navbar </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item"></li>
          </ul>
        </div>

        <li> Welcome, <span class="text-uppercase font-weight-bold ">{userName}</span></li>
        {currentUser && <Button variant="info" onClick={logUserOut}>Log out</Button>
        }
      </nav>
    </div>
  );
}
