import benificiaryModel from "../models/benificiary.js"
import UserAccountModel from "../models/userAccount.js"


const addBeneficiary = async(req,res)=>{
   try {
    
    const{name,account} = req.body

    if(!name || !account){
        return res.json({success:false, meassage:'enter required info'})
    }

    const otherUser = await UserAccountModel.findOne({accountNumber:account})
    console.log(otherUser)
    if(!otherUser){
        return res.json({success:false, meassage:'User not found'})
    }
    
    const verify = await benificiaryModel.find({accountId:otherUser._id})
    console.log(verify)
    if(verify.length>0){
        return res.json({success:false, meassage:'User is already a beneficiary'})
    }


    const user = new benificiaryModel({user:req.user.userId,name, accountId:otherUser._id})
    await user.save()

    return res.json({success:true, meassage:'Beneficiary added successfully'})

   } 
   catch (error) {
    return res.status(500).json({ message: error });
   }


}
const getBeneficiary= async(req,res)=>{

    try {
        
  const beneficiary = await benificiaryModel.find({user:req.user.userId})
 if(!beneficiary){
    return res.json({success:false, meassage:'no beneficiary found'})
 }
 return res.json({success:true, meassage:'Your beneficiary List:',beneficiary})

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
 

const updateBeneficiary = async(req,res)=>{
 try {
    const {id} = req.params
 const {name} = req.body

 if(!name){
    return res.json({success:false, meassage:'enter required info'})
 }

const update = await benificiaryModel.findByIdAndUpdate(id,{name:name},{new:true})

if(!update){
    return res.json({success:false, meassage:'User not found'})
}
return res.json({success:true,meassage:'updated successfully'})
 } catch (error) {
    return res.status(500).json({ message: error });
 }

}

const deleteBeneficiary = async(req,res)=>{
    try {
        const {id} = req.params
    
    const del = await benificiaryModel.findByIdAndDelete(id)
    
    if(!del){
        return res.json({success:false, meassage:'User not found'})
    }
    return res.json({success:true,meassage:'deleted successfully'})
     } catch (error) {
        return res.status(500).json({ message: error });
     }
}

const searchBeneficiary = async(req,res)=>{

   try {
    
    const {name} = req.query
    if(!name){
        return res.json({success:false, meassage:'enter name to search'})
    }
    const beneficiary = await benificiaryModel.find({name:{$regex:req.query.name}})
    
    if(beneficiary<1){
        return res.json({success:false, meassage:'User not found'})
    }
    return res.json({success:true, meassage:'User found:',beneficiary})
   } 
   catch (error) {
    return res.status(500).json({ message: error });
   }

}

export {addBeneficiary,getBeneficiary,updateBeneficiary,deleteBeneficiary,searchBeneficiary}