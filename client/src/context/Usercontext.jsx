import React, { createContext } from 'react'
export  const userdatacontext=createContext({});
const Usercontext = ({children}) => {
    const value={
        serverurl:"http://localhost:7001"
    }
  return (
    <div>
        <userdatacontext.Provider value={value}>
            {children}
        </userdatacontext.Provider>
    </div>
  )
}

export default Usercontext