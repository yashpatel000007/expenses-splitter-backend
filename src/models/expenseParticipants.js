// src/models/expenseParticipants.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Expense = require('./expense');

const ExpenseParticipants = sequelize.define('ExpenseParticipants', {
  amount_owed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

ExpenseParticipants.belongsTo(User, { as: 'user' });
ExpenseParticipants.belongsTo(Expense, { as: 'expense' });

module.exports = ExpenseParticipants;
