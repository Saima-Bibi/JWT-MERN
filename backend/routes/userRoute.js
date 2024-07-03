import express from 'express'
import { Signup , Login} from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/signup',Signup)
userRouter.post("/login", Login)

export default userRouter