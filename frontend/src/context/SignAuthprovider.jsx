import {React, createContext, useContext, useState} from 'react'

export const signAuthContext = createContext();

export function SignAuthProvider({children}) {

    const initialState = JSON.parse(localStorage.getItem("bankApp")) 
    const[signAuth,setSignAuth] = useState(initialState? initialState : undefined)

    return(
    <div>
        <signAuthContext.Provider value={[signAuth,setSignAuth]}>
            {children}
        </signAuthContext.Provider>
        </div>
    )
}

export  const useSignAuth = ()=> {return useContext(signAuthContext)}