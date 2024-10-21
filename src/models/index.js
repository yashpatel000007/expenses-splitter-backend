// src/models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Expense = require('./expense');
const ExpenseParticipants = require('./expenseParticipants');

const initDB = async () => {
  await sequelize.sync({ alter: true }); // Use alter: true to make changes without dropping data
  console.log('Database synchronized');
};

module.exports = { User, Expense, ExpenseParticipants, initDB };
