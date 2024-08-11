import UserModel from "../models/user.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import otpModel from "../models/userOTP.js";
import { OTPService } from "../services/otpService.js";
import { emailSender } from "../services/emailSender.js";
import createTokenAndSaveCookies from "../services/jwt.js";



const signup = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPass = await bcryptjs.hash(password, 10)
        const newUser = new UserModel({ name, email, password: hashedPass, address, phone, image: req.file ? `http://localhost:4003/image/${req.file.filename}` : ' ' })
        await newUser.save()
        const result = await OTPService({ newUser })
        const obj = {
            email: newUser.email,
            subject: process.env.OTPEMAILSUBJECT,
            text: `${process.env.OTPEMAILTEXT} ${result.otp} `
        }
        await emailSender(obj)
        console.log('here')
        res.status(200).json({ message: "User created successfully",newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!user.isVerified ) {
            return res.status(404).json({ success: false, message: "first verify otp to become verified user" })
        }
        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return res.status(400).json({ success: false, message: "Invalid password" })
        }

        const createdToken = createTokenAndSaveCookies(user, res)
   
       
        return res.status(200).json({ success: true, message: "Login succesfully", name: user.name, email: user.email, image: user.image, createdToken })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

const changeUserPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Enter both old and new passwords' });
    }

    try {
        let user = await UserModel.findById(req.user.userId)
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        else {
            const hashedPass = await bcryptjs.hash(newPassword, 10)
            const isMatch = await bcryptjs.compare(oldPassword, user.password)
            if (!isMatch) {
                return res.status(404).json({ message: 'Old password is incorrect' });
            }
            user.password = hashedPass
            await user.save()
            return res.status(200).json({ message: 'Password changed successfully' });
        }


    }

    catch (error) {
        return res.status(404).json({ message: error });
    }

}

const forgetPassword = async (req, res) => {
    try {
        
        const user = await UserModel.findOne({email:req.query.email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const result = await OTPService({ newUser: user })
        console.log(result)
        const obj = {
            email: user.email,
            subject: process.env.OTPEMAILSUBJECT,
            text: `${process.env.OTPEMAILTEXT} ${result.otp} `
        }
        await emailSender(obj)
        res.status(200).json({ success: true, message: "otp sent to your email"})
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const verifyOtpAndResetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;
        
        const email=  req.query.email
        const user = await UserModel.findOne({ email });
        console.log(req.query.email)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the OTP document
        const otpDocument = await otpModel.findOne({ userId: user._id, otp });

        if (!otpDocument || otpDocument.expireIn < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update the password
        const hashedPass = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPass
        await user.save();

        // Delete the OTP document after successful password reset
        await otpModel.deleteOne({ _id: otpDocument._id });

        return res.status(200).json({ message: 'Password reset successfully' });

    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body
        // Find the OTP document

        const otpDocument = await otpModel.findOne({ otp });

        if (!otpDocument || otpDocument.expireIn < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const user = await UserModel.findOne({ _id: otpDocument.userId , email:otpDocument.userEmail})
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isVerified = true
        await user.save()
        return res.status(200).json({ message: 'you are now verified user', user });
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }

}

const updateProfile = async (req, res) => {

   try {
    
    const{name, email, address, phone}= req.body

    const user = await UserModel.findByIdAndUpdate(req.user.userId, {name:name, email:email , address: address, phone:phone, image: `http://localhost:4003/image/${req.file.filename}` }, { new: true })
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully', Info: req.file, Image: `http://localhost:4003/image/${req.file.filename}` });



   } catch (error) {
    return res.status(404).json({ message: error });
   }
}

const resendOtp = async(req,res)=>{
try {
    
    console.log(req.query.userId)
    const user = await UserModel.findById(req.query.userId)
    console.log(user)

    if(!user){
      return  res.status(400).json({message:"user not found"})
    }
    const result = await OTPService({ newUser:user })
    const obj = {
        email: user.email,
        subject: process.env.OTPEMAILSUBJECT,
        text: `${process.env.OTPEMAILTEXT} ${result.otp} `
    }
    await emailSender(obj)
    res.status(200).json({message:"otp sent to your email"})

} catch (error) {
    console.log(error)
    return res.status(404).json({ message: error });
    
}

}

const allUsers= async(req,res)=>{

    try {
        // console.log('Authorization Header:', req.headers.authorization);
        // console.log(req.cookies.jwt)
       const loggedInUser = req.user.userId
        const users = await UserModel.find({
            _id: { $ne: loggedInUser}
        }).select('-password')

    if(!users){
        return res.status(400).json({message:'User not found'})
    }
    return res.status(200).json({message:'Users found',users})

    } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error });
    }
}
const logout = async(req,res)=>{
    
    try {
         
         res.clearCookie("jwt")
         res.status(200).json({message:'User logged out successfully '})

    } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error });
    }

}

export { signup, login, changeUserPassword, forgetPassword, verifyOtpAndResetPassword, verifyOtp, updateProfile , resendOtp, allUsers, logout };