const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    // Free text so the frontend can offer any category list without backend changes.
    // A default set is suggested in categoryConstants.js for the UI to use.
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Other',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'UPI', 'NetBanking', 'Wallet', 'Other'],
      default: 'Cash',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Matches the ExpenseForm.jsx textarea field name exactly
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // adds an `id` string field alongside `_id`, since the frontend reads `expense.id`
      transform: (doc, ret) => {
        // Send date as a plain YYYY-MM-DD string so it drops straight into <input type="date">
        if (ret.date instanceof Date) {
          ret.date = ret.date.toISOString().split('T')[0];
        }
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Speeds up "get my expenses sorted by date" and category-filtered queries
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
