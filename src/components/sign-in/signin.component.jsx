/* eslint-disable no-fallthrough */
import React, { useState, useContext } from 'react'
// useContext - hook is used to use React Context. 
import { 
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  SignInWithEmailAndPass, 
} from '../../utils/firebase/firebase.utils'; 

import FormInputComponent from '../form-input/form-input.component';
import './signin.styles.scss'

// import { UserContext } from '../../context/user.context'; // removed for central auth


import ButtonComponent from '../button/button.component';

// -->> tracking the inputs for the form 
const defaultFormFields = {
  email: "",
  password: "",
}

function SigninComponent() {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields; 

  // Setting the Context Value, so it can be accessed thro-out the app 
  // const { setCurrentUser } = useContext(UserContext) // removed for central auth

  // generic event handler for the form fields -->> 
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormFields({ ...formFields, [name]:value })
  }

  // Sign-in using Email and Password ⏬ 
  const handleSubmit = async(event) => {
    event.preventDefault(); 

    try {
      const user = await SignInWithEmailAndPass(email, password)
      console.log("user-singin :: ", user);  
      
      // setting the user data to "UserContext" so it is accessible in other components 
      // await setCurrentUser(user) // removed for central auth

      await setFormFields(defaultFormFields); 

    } catch (error) {
      
        switch(error.code) {
          case "auth/wrong-password": 
            alert ("Incorrect Password"); 
            break; 
          case "auth/user-not-found":
            alert ("User does not exist")
            break; 
          default: 
            console.log("No error found..");
        }
      console.log("Error in Signing In => ", error);
    }
  }

  // Setting up Google Auth (Sign In With Google) ⏬
  const logGoogleUser = async() => {
    // const { user } = await signInWithGooglePopup();
    await signInWithGooglePopup();
    // Creating user document in firestore db
    // await createUserDocumentFromAuth(user); // removed for central auth 
  }

  
  // setting up Google Auth  (Google redirect signin) ⏬ 

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


  return (
      <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with email and password</span>
        <form
          onSubmit={handleSubmit}
        >
          <FormInputComponent 
            label="Email"
            type="email" 
            required
            name='email'
            onChange={handleChange}
            value={email}
          />
          <FormInputComponent 
            label="Password"
            type="password" 
            required
            name='password'
            onChange={handleChange}
            value={password}
          />

          <div className='buttons-container'>
            <ButtonComponent 
              type="submit" 
            >Sign In
            </ButtonComponent>
            
            <ButtonComponent 
              buttonType='google' 
              type='button'
              onClick={logGoogleUser}
            > Google Sign In
            </ButtonComponent>

            {/* 
              Note: by default form buttons are of type 'submit'
                and if we are to use otherwise then we need to specify
                the type of the button..
            */}
          </div>
        </form>
      </div>
  )
}

export default SigninComponent