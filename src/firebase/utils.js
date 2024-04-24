 import firebase from './config.js';
import { firebaseConfig } from "./config.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase with your configuration
firebase.initializeApp(firebaseConfig);

// Use Firebase authentication and other services
export const auth = getAuth();
export const firestore = firebase.firestore();
export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({'login_hint': 'user@example.com'});


export const handleUserProfile = async ({userAuth, additionalData}) => {
   if (!userAuth) return;
   const { uid } = userAuth;
   const userRef = firestore.doc(`users/${uid}`);
   const snapshot = await userRef.get()

   if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const timestamp = new Date();
      const userRoles = ['user'];
  
      try {
        await userRef.set({
          displayName,
          email,
          createdDate: timestamp,
          userRoles,
          ...additionalData
        });
      } catch(err) {
        // console.log(err);
      }
    }

    return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}


<div>
<script src="https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.3.1/firebase-auth-compat.js"></script>
<script>
   const firebase = firebase.initializeApp({ firebaseConfig });
   const db = firebase.firestore();
   const auth = firebase.auth();
</script>
</div>