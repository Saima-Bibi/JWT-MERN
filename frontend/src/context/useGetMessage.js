

import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios'
import useDecodeToken from './useDecodeToken.js'

function useGetMessage() {
  
    const [loading, setLoading]= useState(false)
    const{messages, setMessage, selectedConversation}=useConversation()
    const { data } = useDecodeToken();
      

    useEffect(()=>{
    
       const getMessages = async()=>{
        setLoading(true)
        if(selectedConversation && selectedConversation._id){
            
            try {
                const res = await axios.get(`/api/message/getmsg/${selectedConversation._id}`)
               if(res.data){
                // JSON.stringify(data)
               console.log(selectedConversation._id)
                setMessage(res.data.messages)
                setLoading(false)
               }
                
     

            } catch (error) {
                if(error.response){
                console.log(`error here : ${error}`)
                setLoading(false)}
            }
        }

       }
       getMessages();



    },[selectedConversation, setMessage])


 return {messages,loading}
}

export default useGetMessage
