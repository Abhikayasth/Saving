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
  }},
  {
    timestamps: true,
  }
);

export default model('Transaction', TransactionSchema);