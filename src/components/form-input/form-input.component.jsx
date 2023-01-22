import React from 'react'
import './form-input.styles.scss'


function FormInputComponent({ label, ...otherProps }) {

  return (

    <div className='group'>

        <input className='form-input' {...otherProps} />
        
        {label && (
            <label className={`${otherProps.value.length ? 'shrink' : ""} form-input-label`}>
                {label} 
            </label>
            )
        }

          {/* <input 
            className='form-input'
            {...otherProps}
            // type="text" 
            // name='displayName' // will help in identifying, which event value to store 
            // required
            // onChange={handleChange}
            // value={displayName}
          /> */}

    </div>
  )
}

export default FormInputComponent; 