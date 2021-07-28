import logo from './logo.svg';
import './App.css';
import {Button ,Form , Alert , Container,Badge} from 'react-bootstrap';
import Singup from './Components/Singup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute'

import {AuthProvider} from './Contexts/AuthContexts';

import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <AuthProvider>
        {/* <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}> */}
        <div className="all-content-wrapper">
            <Router>
            
            <Switch>
              <PrivateRoute  exact path="/" component={Dashboard}/>
              <Route  exact path="/register" component={Singup}/>
              <Route  exact path="/login" component={Login}/>
            </Switch>
      
    </Router>
        </div>
          
  
       
        {/* </Container> */}
      </AuthProvider>
   
    
   
  )
}


export default App;
