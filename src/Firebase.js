import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyD5ndQYJJVQJ0O9Rl1UFORPXPp-mJJ2IDQ",
  authDomain: "fir-crud-restapi-8cc9f.firebaseapp.com",
  databaseURL: "https://fir-crud-restapi-8cc9f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-crud-restapi-8cc9f",
  storageBucket: "fir-crud-restapi-8cc9f.appspot.com",
  messagingSenderId: "44663387665",
  appId: "1:44663387665:web:7b37e8779864a98cf123b0"

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID

})

export const auth = app.auth();
export default firebase;
// export default app;