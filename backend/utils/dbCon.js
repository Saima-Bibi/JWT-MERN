import mongoose from "mongoose"
const dbCon = async()=>{
try {
    await mongoose.connect(process.env.MONGODBURI)
    console.log('DB conected!!')
} catch (error) {
    console.log(error)
}
}
export default dbCon