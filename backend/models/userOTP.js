import mongoose, { Schema } from 'mongoose'

const userOtpSchema = new Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    otp:Number,
    expireIn:Date
},{timestamps:true})
const otpModel = mongoose.model('otp',userOtpSchema)
export default otpModel;