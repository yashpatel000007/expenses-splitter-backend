const { Expense, ExpenseParticipants, User } = require('../models');
const { calculateSplit } = require('../services/expenseService');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

exports.addExpense = async (req, res) => {
  try {
    const { total_amount, split_type, participants } = req.body;
    const expense = await Expense.create({ total_amount, split_type, createdById: req.user.userId });

    const participantSplits = await calculateSplit(expense, participants);

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

exports.downloadBalanceSheet = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: ExpenseParticipants,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
            }
          ]
        },
        {
          model: User,
          as: 'createdBy',
        }
      ]
    });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: 'No expenses found' });
    }

    const csvData = [];
    expenses.forEach(expense => {
      expense.participants.forEach(participant => {
        csvData.push({
          ExpenseID: expense.id,
          TotalAmount: expense.total_amount,
          SplitType: expense.split_type,
          Creator: expense.createdBy.name,
          Participant: participant.user.name,
          AmountOwed: participant.amount_owed,
        });
      });
    });

    const csvWriter = createObjectCsvWriter({
      path: path.join(__dirname, '../../downloads/balance-sheet.csv'),
      header: [
        { id: 'ExpenseID', title: 'Expense ID' },
        { id: 'TotalAmount', title: 'Total Amount' },
        { id: 'SplitType', title: 'Split Type' },
        { id: 'Creator', title: 'Created By' },
        { id: 'Participant', title: 'Participant' },
        { id: 'AmountOwed', title: 'Amount Owed' },
      ]
    });

    await csvWriter.writeRecords(csvData);

    res.download(path.join(__dirname, '../../downloads/balance-sheet.csv'), 'balance-sheet.csv', (err) => {
      if (err) {
        res.status(500).json({ error: 'Error downloading the balance sheet' });
      }
    });

  } catch (error) {
    console.error('Download balance sheet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const userId = req.params.id;
    const expenses = await Expense.findAll({
      include: [
        {
          model: ExpenseParticipants,
          as: 'participants',
          where: { userId: userId },
          include: [
            {
              model: User,
              as: 'user',
            }
          ]
        },
        {
          model: User,
          as: 'creator',
        }
      ]
    });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: 'No expenses found for this user' });
    }

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching user expenses:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all expenses in the system
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: ExpenseParticipants,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
            }
          ]
        },
        {
          model: User,
          as: 'creator',
        }
      ]
    });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: 'No expenses found' });
    }

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching all expenses:', error);
    res.status(500).json({ error: 'Server error' });
  }
};