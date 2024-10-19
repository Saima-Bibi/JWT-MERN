import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
       origin:'http://localhost:3001',
       methods:["GET","POST"] ,
       credentials: true
    }
})

 export const getReceiverSocketId= (receiverId)=>{
    console.log('Looking for socket ID of receiver:', receiverId);  // Log receiverId
    console.log('Active users:', users);
 return users[receiverId]
 }

 const users = {}

//used to listen events on server side
io.on('connection',(socket)=>{
    console.log('user is connected',socket.id)
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id
        console.log('Active User:',userId,users)
    }

    io.emit('getOnlineUsers',Object.keys(users))

//used to listen client side events emitted by server side
socket.on('disconnect',()=>{
    console.log('user is disconnected',socket.id)
    delete users[userId]
    io.emit('getOnlineUsers',Object.keys(users))
})
})
export{app,io,server}