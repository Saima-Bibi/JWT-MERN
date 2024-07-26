import express from 'express'
import { addBeneficiary,getBeneficiary,updateBeneficiary ,deleteBeneficiary, searchBeneficiary} from '../controller/beneficiaryController.js'
import { protect } from '../middleware/Auth.js'

const beneficiaryRouter = express.Router()

beneficiaryRouter.post('/addBeneficary',protect,addBeneficiary)
beneficiaryRouter.get('/getBeneficiary',protect,getBeneficiary)
beneficiaryRouter.put('/updateBeneficiary/:id',protect,updateBeneficiary)
beneficiaryRouter.delete('/deleteBeneficiary/:id',protect,deleteBeneficiary)
beneficiaryRouter.get('/searchBeneficiary',protect,searchBeneficiary)
export default beneficiaryRouter