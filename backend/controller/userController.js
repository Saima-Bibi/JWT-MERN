import UserModel from "../models/user.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import otpModel from "../models/userOTP.js";
import { OTPService } from "../services/otpService.js";
import { emailSender } from "../services/emailSender.js";


const signup = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPass = await bcryptjs.hash(password, 10)
        const newUser = new UserModel({ name, email, password: hashedPass, address, phone })
        await newUser.save()
        console.log(newUser)
        const result = await OTPService({newUser} )
        console.log(result.otp)
        const obj = {
            email:newUser.email,
            subject:process.env.OTPEMAILSUBJECT,
            text:`${process.env.OTPEMAILTEXT} ${result.otp} `
        }
        await emailSender(obj)
        res.status(200).json({ message: "User created successfully", result })

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
        if(user.isVerified === false ){
            return res.json({ success: false, message: "first verify otp to become verified user" })
        }
        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return res.status(400).json({ success: false, message: "Invalid password" })
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '3d' })
        return res.status(200).json({ success: true, message: "Login succesfully", token })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Invalid password" })
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

const sendEmail = async (req, res) => {

    const { email } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
    }
   const result= await OTPService({newUser: user})
    console.log(result)
    const obj = {
        email:user.email,
        subject:process.env.OTPEMAILSUBJECT,
        text:`${process.env.OTPEMAILTEXT} ${result.otp} `
    }
    await emailSender(obj)
    res.json({success:true,message:result})
}

const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!newPassword || typeof newPassword !== 'string') {
        return res.status(400).json({ message: 'Invalid new password' });
    }

    const user = await UserModel.findOne({ email });

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
};

const verifyOtp = async(req,res)=>{

    const{otp}= req.body
    // Find the OTP document
    
    const otpDocument = await otpModel.findOne({ otp });
    
    if (!otpDocument || otpDocument.expireIn < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await UserModel.findById({_id:otpDocument.userId})
    console.log(user)
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    user.isVerified = true
    await user.save()
    return res.status(200).json({ message: 'you are now verified user',user });


}
export { signup, login, changeUserPassword, sendEmail, verifyOtpAndResetPassword, verifyOtp };