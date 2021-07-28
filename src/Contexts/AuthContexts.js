import React ,{useContext,useState,useEffect} from 'react'
import {auth} from '../Firebase';
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export  function AuthProvider({children}) {
    
    const [currentUser , setCurrentUser]=useState();
    const [loading ,setLoading]=useState(true);


    function signUp(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function loginUser(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logOut(){
        return auth.signOut();
    }

    function sendEmailVerfication(){
        
    }
   
    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    },[])


    const value={
        currentUser,
        signUp,
        loginUser,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

   