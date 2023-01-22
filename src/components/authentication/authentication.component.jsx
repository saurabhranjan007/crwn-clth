/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'

import { 
    auth, 
    signInWithGooglePopup,
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect, 
 } from '../../utils/firebase/firebase.utils'

 import SignupComponent from '../sign-up/signup.component'
 import SigninComponent from '../sign-in/signin.component'
 import './authentication.styles.scss'


export default function AuthenticationComponent() {

    // Setting up auth (Sign In With Google) ⏬
    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user); 
        console.log("userDoc.signin", userDocRef);
        // console.log("res ----- ", user);
    }

    // setting up auth  (Google redirect sign in) ⏬ 
    // const SignInRedirect = () => {
    //     useEffect(async() => {
    //         const response = await getRedirectResult(auth); 
    //         // will capture the response from the G Auth redirect

    //         if(response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //             console.log("refff ", userDocRef);
    //         }
    //         // console.log("resssss : ", response);
    //     }, [])
    // }

    // Note: since redirect takes us to a diff route altogether, so any previously called 
    //      function or method will become null and void when it takes us back to our app route.
    //      And that's why we use "getRedirectResult" to tap into the response. 
 
  return (

    <div className='authentication-container'>
        {/* <button
            onClick={() => logGoogleUser()}
        >
            Sign In with Google
        </button> */}

        {/* <button
            onClick={() => SignInRedirect()}
        >
            Sign in with G-Redirect
        </button> */}

        <SigninComponent />

        <SignupComponent />
    </div>

  )
}
