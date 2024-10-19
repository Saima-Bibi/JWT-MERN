import {React, createContext, useContext, useState} from 'react'



 const userInfoContext = createContext()

 export const useUserInfoContext = () => {
  return useContext(userInfoContext);
};

export function UserInfoprovider({children}) {
 
const initialUserState =    JSON.parse(localStorage.getItem("App"));  
const[userInfo,setUserInfo] = useState(initialUserState)

  return (
    <div>
      <userInfoContext.Provider value={[userInfo,setUserInfo]}>
        {children}
      </userInfoContext.Provider>
    </div>
  )
}



