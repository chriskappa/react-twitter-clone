import React from 'react'
import {Button} from 'react-bootstrap';
import {useAuth} from '../Contexts/AuthContexts';
export default function UserProfile() {
    const {currentUser , logOut} = useAuth();
    const image = `https://avatars.abstractapi.com/v1/?api_key=c0a5e53a8949487ca25697cf362b9025&name=${currentUser.email}%20`;
    console.log(currentUser.emailVerified);
    return (
        <div className="userProfile">
            <div class="card" style={{width: 18+'rem'}}>
                <img src={image} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{currentUser.email}</h5>
                    <p class="card-text">Thanks for using this website.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Account created At: {currentUser.metadata.creationTime}</li>
                    <li class="list-group-item">Last Sign In At: {currentUser.metadata.lastSignInTime}</li>
                    {/* <li class="list-group-item">Account Verified: {JSON.stringify(currentUser.emailVerified).toUpperCase()}</li> */}
                    <li class="list-group-item">Account Verified: {currentUser.emailVerified ? <b>Verified</b>:<b>Not Verified</b>}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
            
        </div>
    )
}

