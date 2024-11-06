import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  }},
  {
    timestamps: true,
  }
);

export default model('Transaction', TransactionSchema);