import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cores:{
       origin:'http://localhost:4003',
       methods:["GET","POST"] 
    }
})

const users = {}
//used to listen events on server side
io.on('connection',(socket)=>{
    console.log('user is connected',socket.id)
    // const userId = socket.handshake.query.userId;
    // if(userId){
    //     users[userId]=socket.id
    //     console.log('Active User:',users)
    // }

//used to listen client side events emitted by server side
socket.on('disconnect',()=>{
    console.log('user is disconnected',socket.id)
})
})
export{app,io,server}