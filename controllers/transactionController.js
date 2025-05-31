const Transaction = require('../models/Transaction');

const addTransaction = async (req, res) => {
  const { type, category, amount, note, date } = req.body;

  if (!type || !category || !amount) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const transaction = new Transaction({
    user: req.user._id,
    type,
    category,
    amount,
    note,
    date
  });

  const created = await transaction.save();
  res.status(201).json(created);
};

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
  res.json(transactions);
};

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  await transaction.deleteOne();
  res.json({ message: 'Transaction deleted successfully' });
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction
};
