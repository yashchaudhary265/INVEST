const User = require('../models/user');
const bcrypt = require('bcryptjs');

// ✅ Register Controller
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;  // no custom role from frontend

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user'  // enforce default role
    });

    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Login Controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    res.status(200).json({
      message: 'Login successful',
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
