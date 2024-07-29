import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    SenderId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    ReceiverId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    message:{type:String, required:true}
},{timestamps:true})
const messageModel = mongoose.model('messages', messageSchema)

export default messageModel