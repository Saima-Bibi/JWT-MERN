import jwt from "jsonwebtoken"

const protect = async (req,res,next)=>{
try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
const user = jwt.verify(token, process.env.SECRET_KEY)
req.user= user
// console.log('JWT in Cookies:', req.cookies.jwt); // Check if cookie is available here
// console.log('Authorization Header:', req.header('Authorization'));
next()

} catch (error) {
    res.status(401).json({message: error.message})
}


}
export {protect}