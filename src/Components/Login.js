import React,{useState} from  'react'
import { useAuth} from '../Contexts/AuthContexts';
import {Toast,Alert,Button} from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom';
import { auth } from '../Firebase';
function Login() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    // const [passwordConfirmation ,setPassowrdConfirmation] = useState('')
    const [loading , setLoading]=useState(false);
    const [error , setError]=useState('');
    const {loginUser} = useAuth();
    const [show , setShow] =useState(false);
    const toggleShow = ()=>{setShow(!show)};
    const history = useHistory();

   
   async  function handleSubmit(e){
        e.preventDefault();
        setError('');
            try{
                
                setLoading(true);
                await loginUser(email,password);
                toggleShow()
                setError("Succesfully Logged In")
                history.push("/")
            }
            catch(err){
                setError(err.message);
            }
            setLoading(false);
            
        
        
    }


    function resetPassowrd(){
        const userEmail = prompt("Please Enter Your Email");
        auth.sendPasswordResetEmail(userEmail)
        .then(alert("Please Check your Email"))
        .catch(err =>{
            setError(err);
        })
    }

    if(loading) return(
        <div className="spinner-wrapper center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
            <div className="login-wrapper">
                <form className="w-100 " style={{maxWidth:"400px"}}>

                   
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

<div className="login-wrappert">

</div>
<h3>Login </h3>

<div className="form-group">
 <label>Email address</label>
 <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
</div>

<div className="form-group">
 <label>Password</label>
 <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
</div>



<button  onClick={handleSubmit }className="btn btn-primary btn-block">Submit</button>
<p className="forgot-password text-right">
 Need an Account <Link to="/register">Register</Link>
</p>
<p className="forgot-password text-right">
 Forgot The Password? <Button varian="link" onClick={resetPassowrd}>Click Here!</Button>
</p>
{/* <p>{error}</p> */}

</form>

            </div>
             
     
    )};

export default Login;
