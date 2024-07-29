import conversatonModel from "../models/conversation.js"
import conversationModel from "../models/conversation.js"
import messageModel from "../models/message.js"

const sendMessage = async(req,res)=>{
try {
    
 const {Message}= req.body
 const {id:receiverId}= req.params
 const senderId = req.user.userId
 console.log(receiverId)

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
console.log(msg)
if(msg){
    conversation.messages.push(msg._id)
}
await Promise.all([conversation.save(), msg.save()]) //run parallel

res.status(200).json({
    success:true,
    message:'Message sent successfully',msg}
)

} catch (error) {
    res.status(500).json({success:false, error})
}
}

const getMessages= async(req,res)=>{
try {
    
 const {id:receiverId}= req.params
 const senderId = req.user.userId

 const conversation = await conversationModel.findOne({
    members:{$all:[senderId,receiverId]}
 }).populate('messages')

 if(!conversation){
    return res.json([])
 }
 
 res.status(200).json({success:true,data:conversation.messages})

} catch (error) {
    res.status(500).json({success:false, error})
}
}
export {sendMessage, getMessages}