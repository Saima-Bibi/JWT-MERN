import express from 'express'
import dbCon from './utils/dbCon.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import bankRouter from './routes/bankAccRoutes.js'
import beneficaryRouter from './routes/beneficiaryRoutes.js'
import messageRouter from './routes/messageRoute.js'
import { app, server } from './SocketIO/server.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

dotenv.config()



app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,  // Allow cookies to be sent
  }))

  app.use(express.json())
app.use('/image', express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
 

const PORT = process.env.PORT || 4004
dbCon()

app.use('/api/user',userRouter)
app.use('/api/BankAccount',bankRouter)
app.use('/api/Beneficary',beneficaryRouter)
app.use('/api/message',messageRouter)

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}!!`)
})

