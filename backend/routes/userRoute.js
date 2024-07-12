import express from 'express'
import { signup, login, changeUserPassword, forgetPassword, verifyOtpAndResetPassword, verifyOtp } from '../controller/userController.js'
import { protect } from '../middleware/Auth.js'
import validationRules from '../middleware/validation.js'
import { validateRequest } from '../middleware/ValidateRequest.js'

const userRouter = express.Router()

userRouter.post('/signup',validateRequest(validationRules), signup)
userRouter.post("/login",validateRequest(validationRules), login)
userRouter.post('/change-Password', protect,validateRequest(validationRules), changeUserPassword)
userRouter.post('/forget-Password',validateRequest(validationRules), forgetPassword)
userRouter.post('/verify-Otp',validateRequest(validationRules), verifyOtp)
userRouter.post('/verifyOtp-And-ResetPassword',validateRequest(validationRules), verifyOtpAndResetPassword)
userRouter.get('/', protect, (req, res) => {
    res.status(200).json({ message: "Authorized access, Welcome to dashboard" })
})



export default userRouter