import React,{useState} from 'react'
import {Toast }from 'react-bootstrap';
export default function UserVerificationToast() {

    const [show , setShow]=useState(true);
    const toggleShow = () =>setShow(!show);
    return (
        <div>
            <Toast show={show} onClose={toggleShow} delay={2000} autohide>
                    <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="me-auto">Your account is not Verified</strong>
                            <small>2 seconds ago</small>
                    </Toast.Header>
                    <Toast.Body> Please Verify your email`}</Toast.Body>
                </Toast>
        </div>
    )
}
