import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, // native auth (doesn't require any provider)
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged, 
} from 'firebase/auth'; 

// :>> Observable listeners are (here - onAuthStateChanged) hooked to some stream of events where 
//     it gets triggered based on changes in those events (like Sign-in | Sign-out)

import {
    getFirestore, // firebase cloud storage
    doc, // document instances
    getDoc, // to access the data 
    setDoc, // to set the data 
} from 'firebase/firestore'



// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT8NW4xE6taaDL-lP1ASf9LUEmU60uaaI",
  authDomain: "crwn-clothing-db-2aec3.firebaseapp.com",
  projectId: "crwn-clothing-db-2aec3",
  storageBucket: "crwn-clothing-db-2aec3.appspot.com",
  messagingSenderId: "681977438166",
  appId: "1:681977438166:web:d8b7eab72146b3f12e8e77"
};

const firebaseApp = initializeApp(firebaseConfig);

// setting up authentication.. ⏬⏬

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ 
    prompt: "select_account",
});  


export const auth = getAuth(); 

// -->> opens up sign in modal in a popup 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 

// -->> redirects to the sign page on a different route 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 


// setting up firebase/firestore db ⏬⏬

export const db = getFirestore(); 

// creating and populating the database when a user sign-in 
// condition: if user exists return refrence, if not create one. 
export const createUserDocumentFromAuth = async(
    userAuth, 
    additionalInfo={} // default object, to pass any additional value 
    ) => {

    if(!userAuth) return; // dont't receive "userAuth"? just return. 

    const userDocRef = doc(db, "users", userAuth.uid)
    // doc - needs 3 params, the database, name of collection, unique identifier 

    console.log("DB - ", userDocRef);

    const userSnapshot = await getDoc(userDocRef); 
    console.log("userSnap :: ", userSnapshot);
    console.log("userSnap.exists :: ", userSnapshot.exists());

    if(!userSnapshot.exists()) {

        const { displayName, email } = userAuth; 
        const createdAt = new Date(); 

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo, 
            }); 
            console.log("User created!");

        } catch (error) {
            console.log("Error in creating the user doc : ", error);
        }

    } else {
        console.log("userDocRef : ", userDocRef);
        return userDocRef; 
    }
}


// Handle Email-Pass auth, using email and password 
export const createAuthUserWithEmailAndPassword = async(email, password) => {

    if(!email || !password) return; 

    // since it is a native provider, firebase just requires email and password. 
    return await createUserWithEmailAndPassword(auth, email, password); 
}


// Sign-in using Email and Password 
export const SignInWithEmailAndPass = async(email, password) => {

    if(!email || !password) return; 

    // will allow app users to sign-in
    return await signInWithEmailAndPassword(auth, email, password)
}

// Sign out : signed-in users 
export const SignOutUser = async() => {
    return await signOut(auth); 
}

// Centralised event handling for (Sign-in | Sign-out)
export const onAuthStateChangedListener = async(callback) => {

    if(!callback) return; // no callback won't do nothing 
    onAuthStateChanged(auth, callback)
}
// :>> onAuthStateChanged - it takes two params, one the auth and another a callback func 
//     which gets triggered on the state change (to make it generic, call the func directly)