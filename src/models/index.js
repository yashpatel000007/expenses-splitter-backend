const sequelize = require('../config/database');
const User = require('./user');
const Expense = require('./expense');
const ExpenseParticipants = require('./expenseParticipants');

Expense.belongsTo(User, { as: 'creator', foreignKey: 'createdById' }); 
Expense.hasMany(ExpenseParticipants, { as: 'participants', foreignKey: 'expenseId' });
ExpenseParticipants.belongsTo(User, { as: 'participantUser', foreignKey: 'userId' }); 
ExpenseParticipants.belongsTo(Expense, { as: 'associatedExpense', foreignKey: 'expenseId' }); 

const initDB = async () => {
  await sequelize.sync({ alter: true }); 
  console.log('Database synchronized');
};

module.exports = { User, Expense, ExpenseParticipants, initDB };
