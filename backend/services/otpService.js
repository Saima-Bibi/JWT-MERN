import nodemailer from "nodemailer"
import UserModel from "../models/user.js";
import otpModel from "../models/userOTP.js";
const OTPService = async (req, res) => {

    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
        console.log('User not found')
    }
    const otpCode =  Math.floor(Math.random() * 9000) + 1000
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
        text: `Enter the following OTP to become verified user : ${otpCode}`
    }

    try {
        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully', result)

    } catch (error) {
        console.log(error)
    }
}

export { OTPService }