import express from 'express'
import dbCon from './utils/dbCon.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 4004

dbCon()
app.use(cors())
app.use(express.json())

app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}!!`)
})

