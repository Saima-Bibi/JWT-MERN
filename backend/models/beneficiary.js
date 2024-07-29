import mongoose from 'mongoose'

const beneficiarySchema = new mongoose.Schema(
    {
        user:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        name:{type:String, required:true, trim:true},
        accountId:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userBankAccount'},
        



    },
{timestamps:true})

const beneficiaryModel = mongoose.model('benificiary',beneficiarySchema)
export default beneficiaryModel