import mongoose from 'mongoose'

const benificiarySchema = new mongoose.Schema(
    {
        user:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        name:{type:String, required:true, trim:true},
        accountId:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userBankAccount'},
        



    },
{timestamps:true})

const benificiaryModel = mongoose.model('benificiary',benificiarySchema)
export default benificiaryModel