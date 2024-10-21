const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.registerUser = async (req, res) => {
    try {
      const { name, email, mobile_number, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, mobile_number, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error registering user' });
    }
  };

  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.error('User not found'); // Add log for debugging
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error('Invalid credentials'); // Add log for debugging
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error); // Add log for debugging
      console.log('JWT_SECRET:', process.env.JWT_SECRET);

      res.status(500).json({ error: 'Server error' });
    }
  };

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
