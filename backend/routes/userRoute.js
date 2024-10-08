import express from 'express'
import { signup, login, changeUserPassword, forgetPassword, verifyOtpAndResetPassword, verifyOtp, updateProfile, resendOtp,allUsers, logout} from '../controller/userController.js'
import { protect } from '../middleware/Auth.js'
import validationRules from '../middleware/validation.js'
import { validateRequest } from '../middleware/ValidateRequest.js'
import multer from 'multer'
import path from 'path'

const userRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null, `${file.originalname.split('.').slice(0, -1)}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({ storage })

userRouter.post('/signup', upload.single('image'),validateRequest(validationRules), signup)
userRouter.post("/login",validateRequest(validationRules), login)
userRouter.post('/change-Password', protect,validateRequest(validationRules), changeUserPassword)
userRouter.post('/forget-Password',validateRequest(validationRules), forgetPassword)
userRouter.post('/verify-Otp',validateRequest(validationRules), verifyOtp)
userRouter.post('/verifyOtp-And-ResetPassword',validateRequest(validationRules), verifyOtpAndResetPassword)
userRouter.post('/update-Profile',protect,upload.single('image'),validateRequest(validationRules),updateProfile)
userRouter.post('/resend-Otp',resendOtp)
userRouter.get('/allUsers',protect,allUsers)
userRouter.post('/logout',protect,logout)
userRouter.get('/', protect, (req, res) => {
  console.log(`this stored cookie => ${req.cookies.jwt}`)
    res.status(200).json({ message: "Authorized access, Welcome to dashboard" })
})



export default userRouter