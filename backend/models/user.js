import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
name:{type:String, required:true, trim:true},
email:{type:String, required:true, trim:true},
password:{type:String, required:true, trim:true},
address:{type:String, required:true, trim:true},
phone:{type:String, required:true, trim:true},
image:{type:String, required:true, trim:true},
isVerified:{type:Boolean, default:false}


})
const UserModel = mongoose.model("User",userSchema);
export default UserModel