import mongoose from 'mongoose'


const conversationSchema = new mongoose.Schema({
    members:[
        {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"}
    ],
    messages:[
        {type:mongoose.Schema.Types.ObjectId, required:true, ref:"messages",
         default:[]
        }
        
    ]
},{timestamps:true})
const conversatonModel = mongoose.model('conversatons',conversationSchema)
export default conversatonModel