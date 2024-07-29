import beneficiaryModel from "../models/beneficiary.js"
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
    
    const verify = await beneficiaryModel.find({accountId:otherUser._id})
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
        
  const beneficiary = await beneficiaryModel.find({user:req.user.userId})
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

const update = await beneficiaryModel.findByIdAndUpdate(id,{name:name},{new:true})

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
    
    const del = await beneficiaryModel.findByIdAndDelete(id)
    
    if(!del){
        return res.json({success:false, meassage:'User not found'})
    }
    return res.json({success:true,meassage:'deleted successfully'})
     } catch (error) {
        return res.status(500).json({ message: error });
     }
}

const searchBeneficiary = async (req, res) => {
    try {
        const { name, page = 1, limit = 10 } = req.query;

        // Validate input
        if (!name) {
            return res.json({ success: false, message: 'Enter name to search' });
        }

        // Convert page and limit to numbers and handle invalid inputs
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ success: false, message: 'Invalid page or limit parameters' });
        }

        // Calculate the skip value
        const skip = (pageNumber - 1) * limitNumber;

        // Perform the search with pagination
        const beneficiary = await beneficiaryModel.find({ name: { $regex: req.query.name, $options: 'i' } })
                                                 .skip(skip)
                                                 .limit(limitNumber);

        // Check if any results were found
        if (beneficiary.length < 1) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Get total number of documents matching the query
        const totalResults = await beneficiaryModel.countDocuments({ name: { $regex: req.query.name, $options: 'i' } });

        // Calculate total pages
        const totalPages = Math.ceil(totalResults / limitNumber);

        return res.json({
            success: true,
            message: 'User found',
            data: beneficiary,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalResults
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {addBeneficiary,getBeneficiary,updateBeneficiary,deleteBeneficiary,searchBeneficiary}