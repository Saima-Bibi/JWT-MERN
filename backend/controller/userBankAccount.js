import transactionModel from '../models/transaction.js';
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
const getAccountsById = async(req,res)=>{

try {
    
    const accounts = await UserAccountModel.find({userId:req.user.userId})
    if(!accounts){
        returnres.status(400).json({ message: 'No account found' });
    }
    console.log(accounts)
    res.status(200).json({sucess:true, message:`accounts displayed successfully, your Email: ${req.user.email}`,accounts})

} catch (error) {
    res.status(500).json({sucess:false, message:error})
    console.log(error)
}

}
const depositAmount= async(req,res)=>{

try {
    
    const {accountNumber,amount} = req.body

    
    if(!accountNumber || !amount){
        return res.status(404).json({success:false,message:'Enter both Account Number and Amount to deposit money'})
    }

    const account = await UserAccountModel.findOne({accountNumber})

    const updatedAccount = await UserAccountModel.findByIdAndUpdate(account._id,{balance:account.balance+amount},{new:true})
    if(!updatedAccount){
        return res.status(404).json({success:false,message:'User not found'})
       }
       return res.status(200).json({success:true,message:`Amount deposited successfully to Account: ${accountNumber} `})


} catch (error) {
    res.status(500).json({sucess:false, message:error})
    console.log(error)
}

}
const transferAmount = async(req,res)=>{

    
    try {
   
    const {accountNumberFrom, accountNumberTo, amount} = req.body
    if(!accountNumberFrom || !accountNumberTo || !amount){
        return res.status(404).json({success:false,message:'Enter info to update'})
    }
    const sender = await UserAccountModel.findOne({accountNumber:accountNumberFrom})
    const receiver = await UserAccountModel.findOne({accountNumber:accountNumberTo})
    console.log(sender)
    if(!sender || !receiver){
        return res.status(404).json({success:false,message:'Account not found'})
    }
    if(sender.balance < amount){
        return res.json({success:false,message:'Insufficient Balance'})
    }
    const senderAccount = await UserAccountModel.findByIdAndUpdate(sender.id,{balance:sender.balance-amount},{new:true})
    const receiverAccount = await UserAccountModel.findByIdAndUpdate(receiver.id,{balance:receiver.balance+amount},{new:true})
    
    if(!senderAccount|| !receiverAccount){
        return res.status(404).json({success:false,message:'User not found'})
       }

     const transaction =  new transactionModel({
        SenderName: sender.accountHolderName, 
        SenderAccount:sender.accountNumber,
        ReceiverName:receiver.accountHolderName,
        ReceiverAccount:receiver.accountNumber,
        ReceivedAmount:amount
    })
    await transaction.save()
   
    return res.status(200).json({success:true,message:'Amount sent successfully '})
        
    } catch (error) {
        res.status(500).json({sucess:false, message:error})
       console.log(error)
    }

}

const deleteAccount= async(req,res)=>{
try {
    const {id} = req.params
    console.log(id)
   
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
export {createAccount, getAccounts,getAccountsById,depositAmount, transferAmount, deleteAccount}