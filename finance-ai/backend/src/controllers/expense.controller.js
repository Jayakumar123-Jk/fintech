const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
  res.json(expenses);
};

const createExpense = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const expense = await Expense.create({
    user: req.user._id,
    amount,
    description,
    category,
    date
  });
  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense && expense.user.toString() === req.user._id.toString()) {
    expense.amount = req.body.amount || expense.amount;
    expense.description = req.body.description || expense.description;
    expense.category = req.body.category || expense.category;
    expense.date = req.body.date || expense.date;
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense && expense.user.toString() === req.user._id.toString()) {
    await Expense.deleteOne({ _id: req.params.id });
    res.json({ message: 'Expense removed' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };
