import React, { useEffect } from 'react'
import { useSocketContex } from './socketContext'
import useConversation from '../zustand/useConversation'

export default function useGetSocketMessages() {
    const{socket}=useSocketContex()
    const{messages,setMessage}=useConversation()
   
    useEffect(()=>{
        socket.on('msg',(msg)=>{
            setMessage([...messages, msg])
        })
        return ()=>{
            socket.off('msg')
        }
    },[messages,setMessage,socket])

 




 
}
