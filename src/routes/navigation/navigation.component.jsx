import React, { Fragment, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

import { UserContext } from '../../context/user.context'

import { SignOutUser } from '../../utils/firebase/firebase.utils'

// Note - useContext hook is used to set and access the data in different components using React Context.


export default function NavigationComponent() {

    const { 
        currentUser, 
        // setCurrentUser // removed for central auth 
    } = useContext(UserContext); 
    console.log("current user nav => ", currentUser);

    // const handleSignOut = async() => {
    //     console.log("Inside SignOut");

    //     await SignOutUser(); 
    //     await  setCurrentUser(null); 
    //     // await alert("User signed out!")
    // } 
    // removed for central auth ⬆️ 
    

  return (
        <Fragment>
            <div className='navigation'>

                <Link to="/" className='logo-container'>
                    <CrwnLogo className='logo' /> 
                    {/* imported the .svg as ReactComponent to use directly */}
                </Link>

                <div className='nav-links-container'>
                    <Link className='nav-link' to="/home">HOME</Link>
                    {currentUser ? 
                        <button 
                            className='nav-link' 
                            // onClick={handleSignOut} // removed for central auth
                            onClick={() => SignOutUser()}
                        >SIGN OUT</button>
                    : 
                        <Link className='nav-link' to="/auth">SIGN IN</Link>
                    }
                </div>

            </div>

            <Outlet /> {/* will help render <Home /> below <Nav /> */}
        </Fragment>
  )
}
