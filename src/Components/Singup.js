import React,{useState,useEfeect} from  'react'
import { useAuth} from '../Contexts/AuthContexts';
import {Toast,Alert} from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom';
import { auth } from '../Firebase';
function Singup() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [passwordConfirmation ,setPassowrdConfirmation] = useState('')
    const [loading , setLoading]=useState(false);
    const [error , setError]=useState('');
    const {signUp , currentUser} = useAuth();
    const [show , setShow] =useState(false);
    const toggleShow = ()=>{setShow(!show)};
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        if(password != passwordConfirmation){
            setError("Please enter same password in both fields")
            // 
        }
        // else if(password === passwordConfirmation && password.length < 5 ){
        //     alert("Small Passowrd");
        // }
        else{
            setError('');
            try{
                
                setLoading(true);
                await signUp(email,password);
                toggleShow()
                setError("Succesfully Registered")
                sendEmailVerification();
                history.push("/login");
            }
            catch(err){
                // console.log(err)
                // alert(err.message)
                setError(err.message);
                // alert(err);
            }
            setLoading(false);
            
        }
        
    }

    function resetPassword(){
        auth.sendPasswordResetEmail(email)
        .then(<h1>Please Check your Email</h1>)

    }

    function sendEmailVerification(){
        const user = auth.currentUser;
        user.sendEmailVerification()
        .catch(err=>{
            alert(err);
        })
    }
    return (
      
        <div className="signup-wrapper">
                
            <form className="w-100"style={{maxWidth:"400px"}}>

                 <div className="error">
                        {error&& <Alert variant="danger">{error}</Alert>}
                </div>

                <Toast show={show} onClose={toggleShow} delay={3000} autohide>
                <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">Sucessfuly Registered</strong>
                        <small>2 seconds ago</small>
                </Toast.Header>
                <Toast.Body>{`welcome ${email}`}</Toast.Body>
                </Toast>

            <h3>Create Account</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password Confirmation</label>
                <input type="password"  className="form-control" placeholder="Enter password" onChange={e => setPassowrdConfirmation(e.target.value)} />
            </div>

            <button  onClick={handleSubmit }className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
            Have an Account <Link to="/login">Login</Link>
            </p>
            <p>{error}</p>

            </form>
        </div>  
             
        
     
    )};

export default Singup;
