
import Transaction from '../models/transaction.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addTransaction = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  const { amount, type } = req.body;
  try {
    const newTransaction = new Transaction({ userId, amount, type });
    await newTransaction.save();
    res.status(201).json(new ApiResponse(201, newTransaction, 'Transaction added successfully'));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
})

export const getTransactions = asyncHandler(async(req, res) => {
  const { userId } = req.user._id;
  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(new ApiResponse(200, transactions, 'Transaction Fetched Successfully'));
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
