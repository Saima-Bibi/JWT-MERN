import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios'


function useSendMessage() {
  
    const [loading, setLoading]= useState(false)
    const{messages, setMessage, selectedConversation}=useConversation()
    
    
       const sendMessages = async(Message)=>{
        setLoading(true)
        if(selectedConversation && selectedConversation._id){
            console.log(Message)
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { Message })
                console.log(res)
               if(res.data){
               
               
                setMessage([...messages, res.data.msg])
                console.log(messages)
                setLoading(false)
               }
                
     

            } catch (error) {
                if(error.response){
                console.log(`error here : ${error}`)
                setLoading(false)}
            }
        }

       }
      



   


 return {loading,sendMessages}
}

export default useSendMessage