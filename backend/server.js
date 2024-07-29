import express from 'express'
import dbCon from './utils/dbCon.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import bankRouter from './routes/bankAccRoutes.js'
import beneficaryRouter from './routes/beneficiaryRoutes.js'
import messageRouter from './routes/messageRoute.js'
import { app, server } from './SocketIO/server.js'


dotenv.config()
const PORT = process.env.PORT || 4004

dbCon()
app.use(cors())
app.use(express.json())
app.use('/file', express.static('uploads'))

app.use('/user',userRouter)
app.use('/BankAccount',bankRouter)
app.use('/Beneficary',beneficaryRouter)
app.use('/message',messageRouter)

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}!!`)
})

