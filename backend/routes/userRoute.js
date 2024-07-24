import express from 'express'
import { signup, login, changeUserPassword, forgetPassword, verifyOtpAndResetPassword, verifyOtp, uploadImage} from '../controller/userController.js'
import { protect } from '../middleware/Auth.js'
import validationRules from '../middleware/validation.js'
import { validateRequest } from '../middleware/ValidateRequest.js'
import multer from 'multer'

const userRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage })

userRouter.post('/signup',validateRequest(validationRules), signup)
userRouter.post("/login",validateRequest(validationRules), login)
userRouter.post('/change-Password', protect,validateRequest(validationRules), changeUserPassword)
userRouter.post('/forget-Password',validateRequest(validationRules), forgetPassword)
userRouter.post('/verify-Otp',validateRequest(validationRules), verifyOtp)
userRouter.post('/verifyOtp-And-ResetPassword',validateRequest(validationRules), verifyOtpAndResetPassword)
userRouter.post('/uploadImage',protect,upload.single('file'),uploadImage)
userRouter.get('/', protect, (req, res) => {
    res.status(200).json({ message: "Authorized access, Welcome to dashboard" })
})



export default userRouter