import express from 'express'
import { getMessages, sendMessage } from '../controller/messageController.js'
import { protect } from '../middleware/Auth.js'

const messageRouter = express.Router()
messageRouter.post('/send/:id',protect,sendMessage)
messageRouter.get('/getmsg/:id',protect,getMessages)

export default messageRouter