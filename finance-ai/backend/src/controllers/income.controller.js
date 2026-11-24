const Income = require('../models/Income');

const getIncomes = async (req, res) => {
  const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
  res.json(incomes);
};

const createIncome = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const income = await Income.create({
    user: req.user._id,
    amount,
    description,
    category,
    date
  });
  res.status(201).json(income);
};

const updateIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income && income.user.toString() === req.user._id.toString()) {
    income.amount = req.body.amount || income.amount;
    income.description = req.body.description || income.description;
    income.category = req.body.category || income.category;
    income.date = req.body.date || income.date;
    const updatedIncome = await income.save();
    res.json(updatedIncome);
  } else {
    res.status(404);
    throw new Error('Income not found');
  }
};

const deleteIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income && income.user.toString() === req.user._id.toString()) {
    await Income.deleteOne({ _id: req.params.id });
    res.json({ message: 'Income removed' });
  } else {
    res.status(404);
    throw new Error('Income not found');
  }
};

module.exports = { getIncomes, createIncome, updateIncome, deleteIncome };
