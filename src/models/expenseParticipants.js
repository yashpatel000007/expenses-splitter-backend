const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExpenseParticipants = sequelize.define('ExpenseParticipants', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  amount_owed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const User = require('./user');
const Expense = require('./expense');

ExpenseParticipants.belongsTo(User, { as: 'user', foreignKey: 'userId' });
ExpenseParticipants.belongsTo(Expense, { as: 'expense', foreignKey: 'expenseId' });

module.exports = ExpenseParticipants;
