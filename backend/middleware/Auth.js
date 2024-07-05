import jwt from "jsonwebtoken"

const protect = async (req,res,next)=>{
try {
    var token = req.header('Authorization')
    token= token.split(' ')[1]
    
if(!token){
    return res.status(401).json({message:"no token, Access denied"})
}
const user = jwt.verify(token, process.env.SECRET_KEY)
req.user= user
next()

} catch (error) {
    res.status(401).json({message: error.message})
}


}
export {protect}