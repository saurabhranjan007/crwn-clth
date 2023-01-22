import React, { useState, useContext } from 'react'
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth, 
} from '../../utils/firebase/firebase.utils'; 

import FormInputComponent from '../form-input/form-input.component';
import './signup.styles.scss'

import { UserContext } from '../../context/user.context';

import ButtonComponent from '../button/button.component';

// -->> tracking the inputa for the form 
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "", 
}

function SignupComponent() {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields; 

  // Getting the data setter function for the user from UserContext
  const { setCurrentUser } = useContext(UserContext)

  // generic event handler for the form fields -->> 
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormFields({ ...formFields, [name]:value })
    // based on the "name" - "value - HTML", particular key value in the "defaultFormFields"
    //  object will get updated.. 
  }

  const handleSubmit = async(event) => {
    event.preventDefault(); 

    if(password !== confirmPassword) {
      alert("Passwords do not match..");
      return; 
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password); 
      console.log("resssssssss ", user);

      // Setting/storing the data for user using UserContext 
      await setCurrentUser(user)

      const userRef = await createUserDocumentFromAuth(user, { displayName });
      console.log("userRef__ :", userRef);

      await setFormFields(defaultFormFields)

    } catch (error) {
      
        if(error.code === "auth/email-already-in-use") {
          alert("Mulitple accounts for same email address is prohibited!")
        }
      console.log("Error in creating user", error);
    }
  }


  return (

    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with email and password</span>

        <form
          onSubmit={handleSubmit}
        >

          <FormInputComponent
            label="Display Name"
            type="text"
            required
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />

          <FormInputComponent 
            label="Email"
            type="email" 
            required
            name='email'
            onChange={handleChange}
            value={email}
          />

          {/* <label>Password</label>
          <input 
            type="password" 
            required
            name='password'
            onChange={handleChange}
            value={password}
          /> */}

          <FormInputComponent 
            label="Password"
            type="password" 
            required
            name='password'
            onChange={handleChange}
            value={password}
          />

          <FormInputComponent 
            label="Confirm Password"
            type="password" 
            required
            name='confirmPassword'
            onChange={handleChange}
            value={confirmPassword}
          />

          <ButtonComponent 
            children={"Sign Up"}
            buttonType={"default"}
            type="submit"
          />

        </form>
    </div>

  )
}

export default SignupComponent