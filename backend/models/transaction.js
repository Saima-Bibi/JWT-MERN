import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    SenderId:{type:mongoose.Schema.Types.ObjectId, required: true, ref:'userBankAccount'},
    ReceiverId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'userBankAccount'},
    ReceivedAmount:{type:Number, required:true, trim:true},
},{timestamps:true})

const transactionModel = mongoose.model('transactions',transactionSchema)
export default transactionModel