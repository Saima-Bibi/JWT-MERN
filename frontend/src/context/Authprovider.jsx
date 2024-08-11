import {React, createContext, useContext, useState} from 'react'
import Cookies from 'js-cookie'

export const authContext = createContext()


export function Authprovider({children}) {

const initialUserState =   Cookies.get('jwt')   
const[authUser,setAuthUser] = useState(initialUserState? initialUserState : undefined)

  return (
    <div>
      <authContext.Provider value={[authUser,setAuthUser]}>
        {children}
      </authContext.Provider>
    </div>
  )
}

export  const useAuth  = ()=>  useContext(authContext)
