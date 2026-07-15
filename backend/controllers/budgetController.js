const asyncHandler = require('../utils/asyncHandler');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// @route POST /api/budgets  (create or update - upsert by user+category+month+year)
const setBudget = asyncHandler(async (req, res) => {
  const { category, limit, month, year } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id, category, month, year },
    { limit },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  res.status(200).json(budget);
});

// @route GET /api/budgets?month=7&year=2026
const getBudgets = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  const filter = { user: req.user._id };

  if (month) filter.month = Number(month);
  if (year) filter.year = Number(year);

  const budgets = await Budget.find(filter).sort({ year: -1, month: -1, category: 1 });
  res.status(200).json(budgets);
});

// @route DELETE /api/budgets/:id
const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!budget) {
    return res.status(404).json({ message: 'Budget not found' });
  }
  res.status(200).json({ message: 'Budget deleted successfully' });
});

// @route GET /api/budgets/status?month=7&year=2026
// Compares each budgeted category's limit against actual spending for that month
const getBudgetStatus = asyncHandler(async (req, res) => {
  const month = Number(req.query.month) || new Date().getMonth() + 1;
  const year = Number(req.query.year) || new Date().getFullYear();

  const budgets = await Budget.find({ user: req.user._id, month, year });

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const spendingByCategory = await Expense.aggregate([
    { $match: { user: req.user._id, date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: '$category', spent: { $sum: '$amount' } } },
  ]);

  const spendingMap = {};
  spendingByCategory.forEach((s) => {
    spendingMap[s._id] = s.spent;
  });

  const status = budgets.map((b) => {
    const spent = spendingMap[b.category] || 0;
    const remaining = b.limit - spent;
    return {
      category: b.category,
      limit: b.limit,
      spent,
      remaining,
      overBudget: spent > b.limit,
      percentUsed: b.limit > 0 ? Math.round((spent / b.limit) * 100) : 0,
    };
  });

  res.status(200).json({ month, year, status });
});

module.exports = { setBudget, getBudgets, deleteBudget, getBudgetStatus };
