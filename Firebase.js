import * as firebase from 'firebase';
import App from './App';


const firebaseConfig = {
  apiKey: "AIzaSyCQb0W7DBObHLbCVRrIcPxn2ufjzrdmeeo",
  authDomain: "mobileproject-8d03e.firebaseapp.com",
  databaseURL: "https://mobileproject-8d03e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobileproject-8d03e",
  storageBucket: "mobileproject-8d03e.appspot.com",
  messagingSenderId: "985916051822",
  appId: "1:985916051822:web:4be8a536ad961b384af17f"
};
// Initialize Firebase
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
export {firebase}

function Firebase(){
  return <App />
}

export default firebase;