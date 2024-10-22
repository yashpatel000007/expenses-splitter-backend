const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, mobile_number, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, mobile_number, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    console.error('Register error:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already in use' });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get details of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password from the response
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user details by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Exclude password from the response
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

