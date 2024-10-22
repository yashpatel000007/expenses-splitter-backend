const express = require('express');
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users', authenticateToken, userController.getAllUsers); 
router.get('/users/:id', authenticateToken, userController.getUserById); 

router.post('/expenses', authenticateToken, expenseController.addExpense);
router.get('/expenses/balance-sheet', authenticateToken, expenseController.downloadBalanceSheet);
router.get('/expenses/user/:id', authenticateToken, expenseController.getUserExpenses); 
router.get('/expenses', authenticateToken, expenseController.getAllExpenses);

module.exports = router;
