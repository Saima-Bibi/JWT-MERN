import express from 'express'
import { createAccount, getAccounts, updateAccount ,deleteAccount} from '../controller/userBankAccount.js'
import validationRules from '../middleware/validation.js'
import { validateRequest } from '../middleware/ValidateRequest.js'
import { protect } from '../middleware/Auth.js'


const bankRouter = express.Router()
bankRouter.post('/createAccount',protect,validateRequest(validationRules), createAccount)
bankRouter.get('/getAccounts', getAccounts)
bankRouter.put('/updateAccount/:id', updateAccount)
bankRouter.delete('/deleteAccount/:id', deleteAccount)
export default bankRouter