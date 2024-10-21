const { Expense, ExpenseParticipants } = require('../models');
const { calculateSplit } = require('../services/expenseService');

exports.addExpense = async (req, res) => {
  try {
    const { total_amount, split_type, participants } = req.body;
    const expense = await Expense.create({ total_amount, split_type, createdById: req.user.userId });

    // Split the expense based on the type
    const participantSplits = await calculateSplit(expense, participants);

    // Save the splits to the database
    for (const split of participantSplits) {
      await ExpenseParticipants.create({
        expenseId: expense.id,
        userId: split.user_id,
        amount_owed: split.amount_owed,
      });
    }

    res.status(201).json({ expense, splits: participantSplits });
  } catch (error) {
    res.status(400).json({ error: 'Error adding expense' });
  }
};
