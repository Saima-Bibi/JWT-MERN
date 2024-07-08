import UserModel from "../models/user.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import otpModel from "../models/userOTP.js";
const Signup = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPass = await bcryptjs.hash(password, 10)
        const newUser = new UserModel({ name, email, password: hashedPass, address, phone })
        await newUser.save()

        res.status(200).json({ message: "User created successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
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
        return res.status(404).json({ message: 'User not found' });
    }
    const otpCode = Math.floor(Math.random() * 10000 + 1)
    const otpData = new otpModel({
        userId: user._id,
        otp: otpCode,
        expireIn: Date.now() + 10 * 60 * 1000
    })
    await otpData.save()
    console.log(otpData)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bibi33243@gmail.com',
            pass: 'mgkwjhxgaljridbp'
        }
    })

    const mailOptions = {
        from: 'bibi33243@gmail.com',
        to: user.email,
        subject: 'OTP Sended',
        text: `Enter the following OTP to reset password : ${otpCode}`
    }

    try {
        const result = await transporter.sendMail(mailOptions)
        return res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
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
export { Signup, Login, changeUserPassword, sendEmail, verifyOtpAndResetPassword };