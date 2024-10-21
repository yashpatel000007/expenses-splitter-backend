const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Expense = sequelize.define('Expense', {
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  split_type: {
    type: DataTypes.ENUM('EQUAL', 'EXACT', 'PERCENTAGE'),
    allowNull: false,
  },
});

Expense.belongsTo(User, { as: 'createdBy' });

module.exports = Expense;
