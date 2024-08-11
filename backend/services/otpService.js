
import otpModel from "../models/userOTP.js";



const OTPService = async ({newUser}) => {


   
    const otpCode = Math.floor(Math.random() * 9000) + 1000
    const otpData = new otpModel({
        userId: newUser._id,
        userEmail:newUser.email,
        otp: otpCode,
        expireIn: Date.now() + 10 * 60 * 1000
    })
    await otpData.save()
    console.log(otpData)
    const result = otpData
    return result
}

export { OTPService }