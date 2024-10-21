const express = require('express');
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// User routes
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users/:id', authenticateToken, userController.getUserDetails);

// Expense routes
router.post('/expenses', authenticateToken, expenseController.addExpense);

module.exports = router;
