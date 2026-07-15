const express = require('express');
const router = express.Router();

const { setBudget, getBudgets, deleteBudget, getBudgetStatus } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const { validateBudget } = require('../middleware/validateMiddleware');

router.use(protect);

router.get('/status', getBudgetStatus); // must come before /:id

router.route('/')
  .get(getBudgets)
  .post(validateBudget, setBudget);

router.delete('/:id', deleteBudget);

module.exports = router;
