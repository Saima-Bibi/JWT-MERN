import UserModel from "../models/user.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const Signup = async(req,res)=>{
    try {
        const {name,email,password,address,phone}=req.body
        
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPass = await bcryptjs.hash(password,10)
        const newUser= new UserModel({name,email,password:hashedPass,address,phone})
        await newUser.save()

        res.status(200).json({message: "User created successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const Login =async (req,res)=>{
    try {
        const{email,password}= req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        const validPass= await bcryptjs.compare(password, user.password)
        if(!validPass){
            return res.status(400).json({success:false, message:"Invalid password"})
        }

        const token = jwt.sign({userId:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:'3d'})
        return res.status(200).json({success:true, message:"Login succesfully",token})

    } catch (error) {
        return res.status(500).json({success:false, message:"Invalid password"})
    }
}

const changeUserPassword= async(req,res)=>{

    const{oldPassword,newPassword}= req.body

   if(!oldPassword || !newPassword){
    return res.status(400).json({ message: 'Enter both old and new passwords' });
   }
   
   try{
       const user = await UserModel.findById(req.user.userId)
       console.log(user)

  if(!user){
    return res.status(404).json({ message: 'User not found' });
   }

else{
    const hashedPass = await bcryptjs.hash(newPassword,10)
    const isMatch = await bcryptjs.compare(oldPassword,user.password)
    if(!isMatch){
        return res.status(404).json({ message: 'Old password is incorrect' });
    }
    user.password= hashedPass
    await user.save()
    return res.status(200).json({ message: 'Password changed successfully' });
}


  }

   catch(error){
    return res.status(404).json({ message: error });
   }

}
export {Signup, Login, changeUserPassword}