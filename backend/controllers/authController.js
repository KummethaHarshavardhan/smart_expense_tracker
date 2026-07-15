const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const Users = require('../models/users');

// @route POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Users.findOne({ email: email.toLowerCase() });
  if (userExists) {
    return res.status(400).json({ message: 'A user with this email already exists' });
  }

  const user = await Users.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});

// @route POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});

// @route GET /api/auth/profile (protected)
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @route PUT /api/auth/profile (protected)
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, monthlyIncome } = req.body;

  if (name !== undefined) req.user.name = name;
  if (monthlyIncome !== undefined) req.user.monthlyIncome = monthlyIncome;

  if (email !== undefined && email.toLowerCase() !== req.user.email) {
    const emailTaken = await Users.findOne({ email: email.toLowerCase() });
    if (emailTaken) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    req.user.email = email.toLowerCase();
  }

  const updatedUser = await req.user.save();
  res.status(200).json(updatedUser);
});

// @route PUT /api/auth/change-password (protected)
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  const user = await Users.findById(req.user._id);
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  user.password = newPassword; // pre-save hook will hash it
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
});

module.exports = { registerUser, loginUser, getProfile, updateProfile, changePassword };
