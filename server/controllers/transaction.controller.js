import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addTransaction = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  const { amount, type, description, date } = req.body;
  console.log(date);
  try {
    const user = await User.findById(userId);

    if (type === 'credit') {
      user.balance += amount;
    } else if (type === 'debit') {
      user.balance -= amount;
    }

    if(user.balance < 0) {
      res.status(400).json(new ApiError(400, 'Insufficient Balance'));
    }

    const newTransaction = new Transaction({ userId, amount, type, date, description });
    await newTransaction.save();

    await user.save();

    res.status(201).json(new ApiResponse(201, {newTransaction, balance: user.balance}, 'Transaction added successfully'));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
})

export const getTransactions = asyncHandler(async(req, res) => {
  const userId  = req.user._id;
  try {
    const user = await User.findById(userId);
    const transactions = await Transaction.find({ userId });
    console.log(transactions)
    res.status(200).json(new ApiResponse(200, {transactions, balance: user.balance}, 'Transaction Fetched Successfully'));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
})

export const deleteTransaction = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;
    try {
      const transaction = await Transaction.findById(transactionId);
  
      if (!transaction) {
        throw new ApiError(404, 'Transaction Not Found');
      }
  
      await transaction.remove();
      res.status(200).json(new ApiResponse(200, null, 'Transaction Deleted Successfully'));
    } catch (error) {
      res.status(500).json(new ApiError(500, error.message));
    }
  });

  export const getTransaction = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;
    try {
      const transaction = await Transaction.findById(transactionId);
  
      if (!transaction) {
        throw new ApiError(404, 'Transaction Not Found');
      }
      res.status(200).json(new ApiResponse(200, transaction, 'Transaction Fetched Successfully'));
    } catch (error) {
      res.status(500).json(new ApiError(500, error.message));
    }
  });
