import express from 'express'
import { signup, login, changeUserPassword, sendEmail, verifyOtpAndResetPassword, verifyOtp } from '../controller/userController.js'
import { protect } from '../middleware/Auth.js'

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post("/login", login)
userRouter.post('/change-Password', protect, changeUserPassword)
userRouter.post('/send-Email', sendEmail)
userRouter.post('/verify-Otp', verifyOtp)
userRouter.post('/verifyOtp-And-ResetPassword', verifyOtpAndResetPassword)
userRouter.get('/', protect, (req, res) => {
    res.status(200).json({ message: "Authorized access, Welcome to dashboard" })
})



export default userRouter