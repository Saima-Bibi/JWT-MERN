import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    SenderName:{type:String, required:true, trim:true},
    SenderAccount:{type:String, required:true, trim:true},
    ReceiverName:{type:String, required:true, trim:true},
    ReceiverAccount:{type:String, required:true, trim:true},
    ReceivedAmount:{type:Number, required:true, trim:true},
},{timestamp:true})

const transactionModel = mongoose.model('transactions',transactionSchema)
export default transactionModel