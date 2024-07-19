import UserModel from '../models/user.js'
import UserAccountModel from '../models/userAccount.js'
import generateRandomString from '../services/RandomString.js'

const createAccount = async(req,res)=>{
    try {
       
        const accountNumber = generateRandomString(6)+Date.now();

        const{accountHolderName,bankName}= req.body
        
        const newAccount =  new UserAccountModel({userId:req.user.userId, accountHolderName, accountNumber,bankName})
        await newAccount.save()
        // console.log(newAccount)
        res.status(200).json({sucess:true, message:"User's Online Bank Acount created successfully"})
    }
     catch (error) {
        res.status(500).json({sucess:false, message:error})
       
    }
}

const getAccounts = async(req,res)=>{
try {
    const accounts = await UserAccountModel.find()
    if(!accounts){
        returnres.status(400).json({ message: 'No account found' });
    }
    console.log(accounts)
    res.status(200).json({sucess:true, message:'accounts displayed successfully',accounts})

} catch (error) {
    res.status(500).json({sucess:false, message:error})
    console.log(error)
}
}

const updateAccount = async(req,res)=>{

    try {
   
    const Id = req.params.id

    const {accountNumber, amount} = req.body
    if(Object.keys(req.body).length === 0){
        return res.status(404).json({success:false,message:'Enter info to update'})
    }
    const anotherUser = await UserAccountModel.findOne({accountNumber})
    if(!anotherUser){
        return res.status(404).json({success:false,message:'User not found'})
    }

    const updatedAccount = await UserAccountModel.findByIdAndUpdate(anotherUser.id,{balance:+amount},{new:true})
    if(!updatedAccount){
     return res.status(404).json({success:false,message:'User not found'})
    }
    return res.status(200).json({success:true,message:'Account updated successfully '})
        
    } catch (error) {
        res.status(500).json({sucess:false, message:error})
       console.log(error)
    }

}

const deleteAccount= async(req,res)=>{
try {
    const {id} = req.params
    console.log(id)
    // if( id === '' || id === undefined || id === null){
    //     return res.status(404).json({success:false, message:'give Id to delete Account'})
    // }
    const deletedAccount = await UserAccountModel.findByIdAndDelete(id)
    if(!deletedAccount){
        return res.status(404).json({success:false,message:'User not found'})
       }
       return res.status(200).json({success:true,message:'Account deleted successfully '})
           
} catch (error) {
    res.status(500).json({sucess:false, message:error})
    console.log(error)  
}
}
export {createAccount, getAccounts, updateAccount, deleteAccount}