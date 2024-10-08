import express from 'express'
import { createAccount, getAccounts, transferAmount ,deleteAccount,getAccountsById, depositAmount,getTransactionHistory} from '../controller/userBankAccount.js'
import validationRules from '../middleware/validation.js'
import { validateRequest } from '../middleware/ValidateRequest.js'
import { protect } from '../middleware/Auth.js'


const bankRouter = express.Router()
bankRouter.post('/createAccount',protect,validateRequest(validationRules), createAccount)
bankRouter.get('/getAccounts', getAccounts)
bankRouter.get('/getAccountsById',protect,getAccountsById)
bankRouter.put('/transferAmount',protect, transferAmount)
bankRouter.put('/depositAmount',protect,depositAmount)
bankRouter.delete('/deleteAccount/:id',protect, deleteAccount)
bankRouter.get('/getTransactionHistory',protect,getTransactionHistory)
export default bankRouter