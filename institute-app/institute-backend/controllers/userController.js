const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, getUserDetails, updateUserDetails, updateUserAddress } = require('../models/userModel');

const register = async (req, res) => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, role);

    res.status(201).json({ message: 'User registered', userId });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'No user found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, full_name:user.first_name + " " + user.last_name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}; 
const getProfile = async (req, res) => {
  try {
    const user = await getUserDetails(req.user.id);
    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
}; 

const updateUser = async (req, res) => {
  const { first_name, last_name, email, phone_number, gender, date_of_birth } = req.body;
  try {
    const user = await updateUserDetails(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

const updateAddress = async (req, res) => {
  const { street, city, state, pin_code, country } = req.body;
  try {
    const user = await updateUserAddress(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

module.exports = { register, login, getProfile, updateUser, updateAddress, deleteUser };