const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  split_type: {
    type: DataTypes.ENUM('EQUAL', 'EXACT', 'PERCENTAGE'),
    allowNull: false,
  },
});

Expense.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

module.exports = Expense;
