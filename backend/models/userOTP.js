import mongoose, { Schema } from 'mongoose'

const userOtpSchema = new Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    otp:{type: Number, required:true},
    expireIn:Date
},{timestamps:true})
const otpModel = mongoose.model('otp',userOtpSchema)
export default otpModel;