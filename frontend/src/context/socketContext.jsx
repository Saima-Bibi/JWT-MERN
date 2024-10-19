import {React, createContext, useContext, useEffect, useState} from 'react'
import useDecodeToken from './useDecodeToken';
import  io from 'socket.io-client'
import { useAuth } from './Authprovider';
import { useUserInfoContext } from './UserInfoProvider';


const socketContext = createContext();


export  const useSocketContex=()=>{
  return useContext(socketContext)
}

export function SocketProvider({children}) {

    const  [userInfo ] = useUserInfoContext() ;
    const[socket,setSocket] = useState(null)
    const[onlineUsers,setOnlineUsers]= useState([])
    
    
     const userData = JSON.parse(localStorage.getItem("App")); 
    
      //console.log(userInfo.id)
  

     useEffect(()=>{
      if(userData){
        const socket = io('http://localhost:4003',{
            query:{
                userId : userInfo.id,
                withCredentials: true
            },
          })
   
          setSocket(socket)
          socket.on('getOnlineUsers',(users)=>{
            setOnlineUsers(users)
          })
          return ()=>socket.close()
      } else{

        if(socket){
            socket.close()
            setSocket(null)
        }
      }

     }, [userInfo])  
 return(
    <div>
        <socketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </socketContext.Provider>
        </div>
    )
}

