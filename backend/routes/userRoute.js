import express from 'express'
import { Signup , Login, changeUserPassword, sendEmail, verifyOtpAndResetPassword, verifyOtp} from '../controller/userController.js'
import { protect } from '../middleware/Auth.js'

const userRouter = express.Router()

userRouter.post('/signup',Signup)
userRouter.post("/login", Login)
userRouter.post('/changePassword', protect, changeUserPassword)
userRouter.post('/sendEmail', sendEmail)
userRouter.post('/verifyOtp',verifyOtp)
userRouter.post('/verifyOtpAndResetPassword',verifyOtpAndResetPassword)
userRouter.get('/', protect, (req,res)=>{
res.status(200).json({message:"Authorized access, Welcome to dashboard"})
})

    

export default userRouter