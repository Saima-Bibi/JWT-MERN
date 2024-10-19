import conversatonModel from "../models/conversation.js"
import conversationModel from "../models/conversation.js"
import messageModel from "../models/message.js"
import { getReceiverSocketId, io } from "../SocketIO/server.js"


const sendMessage = async(req,res)=>{
try {
    
 const {Message}= req.body
 const {id:receiverId}= req.params
 const senderId = req.user.userId
 console.log(Message)

let conversation = await conversationModel.findOne({
    members:{$all:[senderId,receiverId]}
})
if(!conversation){
    conversation = await conversationModel.create({
        members:[senderId,receiverId]
    })
}
//console.log(conversation)
const msg = new messageModel({
    SenderId: senderId,
    ReceiverId:receiverId,
    message:Message
})
console.log('message before save',msg.message)
if(msg){
    conversation.messages.push(msg._id)
}
await Promise.all([conversation.save(), msg.save()]) //run parallel
const receiverSocketId = getReceiverSocketId(receiverId)
console.log(receiverSocketId)
if(receiverSocketId){
    io.to(receiverSocketId).emit('msg',msg)
}

res.status(200).json({
    success:true,
    message:'Message sent successfully',msg}
)

} catch (error) {
    res.status(500).json({success:false, error: error.message})
}
}

const getMessages= async(req,res)=>{
try {
    
 const {id:receiverId}= req.params
 const senderId = req.user.userId
 console.log(receiverId, senderId)

 let conversation = await conversationModel.findOne({
    members:{$all:[senderId,receiverId]}
}).populate('messages')

console.log(conversation)
 if(!conversation){
    return res.status(201).json({message:"no conversation found"})
 }
 const messages = conversation.messages;
 res.status(200).json({success:true, message:"all conversation found", messages})

} catch (error) {
    res.status(500).json({success:false, error, message:'internal server error'})
}
}
export {sendMessage, getMessages}