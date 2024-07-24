import mongoose from 'mongoose';
import transactionModel from '../models/transaction.js';
import UserModel from '../models/user.js'
import UserAccountModel from '../models/userAccount.js'
import generateRandomString from '../services/RandomString.js'
import exceljs from 'exceljs'

const createAccount = async (req, res) => {
    try {

        const accountNumber = generateRandomString(6) + Date.now();

        const { accountHolderName, bankName } = req.body

        const newAccount = new UserAccountModel({ userId: req.user.userId, accountHolderName, accountNumber, bankName })
        await newAccount.save()
        // console.log(newAccount)
        res.status(200).json({ sucess: true, message: "User's Online Bank Acount created successfully" })
    }
    catch (error) {
        res.status(500).json({ sucess: false, message: error })

    }
}

const getAccounts = async (req, res) => {
    try {
        const accounts = await UserAccountModel.find()
        if (!accounts) {
            returnres.status(400).json({ message: 'No account found' });
        }
        console.log(accounts)
        res.status(200).json({ sucess: true, message: 'accounts displayed successfully', accounts })

    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }
}
const getAccountsById = async (req, res) => {
    try {
        console.log(req.user.userId);
        const accounts = await UserAccountModel.aggregate([
            {
                $match: { 
                    userId: mongoose.Types.ObjectId.createFromHexString(req.user.userId) 
                }
            },            
            {
                $lookup: {
                  from: 'users',
                  localField: 'userId',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              {
                $unwind: {
                  path: '$user',
                  preserveNullAndEmptyArrays: false
                }
              },
            {
                $project: {
                    userId: 0,
                    'user.name': 0,
                    'user.password': 0,
                    'user.phone': 0,
                    'user.address': 0,
                    'user.isVerified':0,
                    'user.__v':0
                }
            }
        ]);
        console.log(accounts);
        if (!accounts) {
            return res.status(400).json({ message: 'No account found' });
        }
        res.status(200).json({ sucess: true, message: 'accounts displayed successfully', accounts })

    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }
}

const depositAmount = async (req, res) => {

    try {

        const { accountNumber, amount } = req.body


        if (!accountNumber || !amount) {
            return res.status(404).json({ success: false, message: 'Enter both Account Number and Amount to deposit money' })
        }

        const account = await UserAccountModel.findOne({ accountNumber })

        const updatedAccount = await UserAccountModel.findByIdAndUpdate(account._id, { balance: account.balance + amount }, { new: true })
        if (!updatedAccount) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true, message: `Amount deposited successfully to Account: ${accountNumber} ` })


    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }

}
const transferAmount = async (req, res) => {


    try {

        const { accountNumberFrom, accountNumberTo, amount } = req.body
        if (!accountNumberFrom || !accountNumberTo || !amount) {
            return res.status(404).json({ success: false, message: 'Enter info to update' })
        }
        //123 1
        const sender = await UserAccountModel.findOne({ accountNumber: accountNumberFrom, userId: req.user.userId })
        const receiver = await UserAccountModel.findOne({ accountNumber: accountNumberTo })
        console.log(sender)
        if (!sender || !receiver) {
            return res.status(404).json({ success: false, message: 'Account not found' })
        }
        if (sender.balance < amount) {
            return res.json({ success: false, message: 'Insufficient Balance' })
        }
        const senderAccount = await UserAccountModel.findByIdAndUpdate(sender.id, { balance: sender.balance - amount }, { new: true })
        const receiverAccount = await UserAccountModel.findByIdAndUpdate(receiver.id, { balance: receiver.balance + amount }, { new: true })

        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        const transaction = new transactionModel({
            SenderId: sender.id, //
            ReceiverId: receiver.id,
            ReceivedAmount: amount
        })
        await transaction.save()

        return res.status(200).json({ success: true, message: 'Amount sent successfully ' })

    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }

}

const deleteAccount = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)

        const account = await UserAccountModel.findById(id)

        console.log(account)
        if (account.userId != req.user.userId) {
            return res.status(404).json({ success: false, message: 'Unauthorized Access' })
        }
        const deletedAccount = await UserAccountModel.findByIdAndDelete(id)//
        if (!deletedAccount) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true, message: 'Account deleted successfully ' })

    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }
}
//tran-history
const getTransactionHistory = async (req, res) => {
    try {
        const accounts = await UserAccountModel.find({ userId: req.user.userId })
        if (accounts.length < 1) {
            return res.status(400).json({ message: 'No account found' });
        }

        const accountIds = accounts.map(account => account._id)

        var history = await transactionModel.find({
            $or: [
                { SenderId: { $in: accountIds } },
                { ReceiverId: { $in: accountIds } }
            ]
        }).sort({ createdAt: -1 }).populate({ path: 'SenderId ReceiverId', select: 'accountHolderName accountNumber _id' });

        if (!history) {
            return res.status(400).json({ message: 'No transactions found' });
        }

        const excelData = history.map(transaction => {
            const Type = accountIds
                .filter(id => id.toString() == transaction.SenderId._id.toString())
                .length > 0 
                    ? 'Sent' 
                    : 'Received';
            const excelRow = {
                Sender: transaction.SenderId.accountHolderName,
                SenderAccount: transaction.SenderId.accountNumber,
                Receiver: transaction.ReceiverId.accountHolderName,
                ReceiverAccount: transaction.ReceiverId.accountNumber,
                ReceivedAmount: transaction.ReceivedAmount,
                Type,
                TransactionDate: transaction.createdAt,
            };
            return excelRow;
        });

        console.log(excelData);
        const workBook = new exceljs.Workbook()
        const workSheet = workBook.addWorksheet('transaction history')

        workSheet.columns = [
            { header: 'Sr no.', key: 'sr_no', width: '10' },
            { header: 'Sender Name', key: 'Sender', width: '20' },
            { header: 'Sender Account', key: 'SenderAccount', width: '20' },
            { header: 'Receiver Name', key: 'Receiver', width: '20' },
            { header: 'Receiver Account', key: 'ReceiverAccount', width: '20' },
            { header: 'Amount', key: 'ReceivedAmount', width: '10' },
            { header: 'Action', key: 'Type', width: '10' },
            { header: 'Date', key: 'TransactionDate', width: '10' },
        ]

        let counter = 1
        excelData.forEach((user) => {
            user.sr_no = counter
            workSheet.addRow(user)
            counter++
        })

        workSheet.getRow(1).eachCell((cell) => {
            { cell.font = { bold: true } }
        })
        res.setHeader(
            "Content-Type",
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=transactions.xlsx`
        )


        return workBook.xlsx.write(res).then(() =>
            console.log('excel file downloaded')
        )



    } catch (error) {

        res.status(500).json({ sucess: false, message: error })
        console.log(error)
    }

}
export { createAccount, getAccounts, getAccountsById, depositAmount, transferAmount, deleteAccount, getTransactionHistory }