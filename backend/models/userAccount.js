import mongoose from 'mongoose'

const userAccountSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    accountHolderName: {type:String, required:true, trim:true},
    accountNumber:{type:String, required:true, trim:true},
    bankName:{type:String, required:true, trim:true},
    balance:{type:Number, default:0, trim:true},
},{timestamps:true})

const UserAccountModel = mongoose.model('userBankAccount',userAccountSchema)

export default UserAccountModel