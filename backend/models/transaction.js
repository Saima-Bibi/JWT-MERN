import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    SenderId:{type:mongoose.Schema.Types.ObjectId, required: true, ref:'userBankAccount'},
    SenderAccount:{type:String, required:true, trim:true},
    ReceiverId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'userBankAccount'},
    ReceiverAccount:{type:String, required:true, trim:true},
    ReceivedAmount:{type:Number, required:true, trim:true},
},{timestamps:true})

const transactionModel = mongoose.model('transactions',transactionSchema)
export default transactionModel