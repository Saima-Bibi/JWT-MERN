import jwt from 'jsonwebtoken'

const createTokenAndSaveCookies = (user,res)=>{
    
    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.SECRET_KEY, { expiresIn: '3d' });
   
    res.cookie("jwt",token)
    
    return token
}


export default createTokenAndSaveCookies