import React from 'react'
import './button.styles.scss'

// Three kinds of button styling: Default, Inverted, and Google. 

const BUTTON_TYPE_CLASSES = {
    google: 'goole-sign-in',
    inverted: 'inverted',
    // default: 'default-sign-in', 
}

function ButtonComponent({ children, buttonType, ...otherProps }) {

  return (

        <button 
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps} // will spread other props passed, for button component 
        > 
            {children} 
        </button>
  )
}

export default ButtonComponent
