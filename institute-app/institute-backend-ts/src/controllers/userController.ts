import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, getUserDetails, updateUserDetails, updateUserAddress } from '../models/userModel';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth, role } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, role);
    res.status(201).json({ message: 'User registered', userId });
  } catch (err: any) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'No user found' });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign(
      { id: user.id, full_name: user.first_name + ' ' + user.last_name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await getUserDetails(userId);
    res.json(user);
  } catch (err: any) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await updateUserDetails(userId, req.body);
    res.json(user);
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await updateUserAddress(userId, req.body);
    res.json(user);
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'User deleted' });
  } catch (err: any) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};
