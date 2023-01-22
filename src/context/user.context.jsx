import React, { createContext, useState } from 'react'


// Literal context (stores the data)
export const UserContext = createContext({

    // default values :: null (here value is an object, evaluating the variable and the setter function to have null as the init value)
    currentUser: null, 
    setCurrentUser: () => null, 
}) 

// Note: every context that gets built, there is a ".Provider" for that. 
//      .Provider - is the component that wraps around any of the components that need access to the data

// Provider (the actual component)
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}; 

    return <UserContext.Provider value={value}>{children}</UserContext.Provider> 
}
