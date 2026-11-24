const express = require('express');
const { getExpenses, createExpense, updateExpense, deleteExpense } = require('../controllers/expense.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/')
  .get(protect, getExpenses)
  .post(protect, createExpense);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;
