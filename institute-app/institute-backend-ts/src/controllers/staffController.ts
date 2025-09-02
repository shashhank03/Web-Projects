import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, updateUserDetails, addCoursesToStaff } from '../models/userModel';

export const getStaffDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const [staffRows] = await pool.execute<any[]>(`
      SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth,
        a.street, a.city, a.state, a.pin_code, a.country
      FROM users u
      LEFT JOIN address a ON u.id = a.user_id
      WHERE u.role = 'Staff'
    `);

    const staffWithCourses = await Promise.all(staffRows.map(async staff => {
      const [courses] = await pool.execute<any[]>(`
        SELECT c.id, c.course_name, c.course_code FROM course_instructors ci
        JOIN course c ON ci.course_id = c.id
        WHERE ci.staff_id = ?
      `, [staff.user_id]);
      return {
        ...staff,
        courses: courses 
      };
    }));
    res.json(staffWithCourses);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff details' });
  }
};

export const addStaff = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, 'Staff');
    res.status(201).json({ message: 'Staff added', userId });
  } catch (err: any) {
    res.status(500).json({ message: 'Adding staff failed', error: err.message });
  }
};

export const getStaffCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const [courses] = await pool.execute(`
      SELECT c.course_name, c.course_code, ci.staff_id FROM course c
      JOIN course_instructors ci ON c.id = ci.course_id WHERE ci.staff_id = ?
    `, [userId]);
    res.json(courses);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff courses' });
  }
};

export const assignCoursesToStaff = async (req: Request, res: Response): Promise<void> => {
  const { staff_id, course_id } = req.body;
  try {
    const courseIds = Array.isArray(course_id) ? course_id : [course_id];
    const result = await addCoursesToStaff(staff_id, courseIds);
    if (result) {
      res.json({ message: 'Courses assigned successfully' });
    } else {
      res.status(400).json({ message: 'Failed to assign courses' });
    }
  } catch (error: any) {
    console.error('Assignment error:', error);
    res.status(500).json({ message: 'Assignment failed', error: error.message });
  }
};

export const deleteStaff = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM course_instructors WHERE staff_id = ?', [id]);
    await pool.execute('DELETE FROM address WHERE user_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM users WHERE id = ? AND role = "Staff"', [id]);
    if ((result as any).affectedRows > 0) {
      res.json({ message: 'Staff deleted successfully' });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error: any) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete staff', error: error.message });
  }
};

export const updateStaff = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE email = ? AND id != ?', 
      [req.body.email, id]
    );
    if ((existingUser as any[]).length > 0) {
      res.status(400).json({ message: 'Email already exists for another user' });
      return;
    }
    const result = await updateUserDetails(id, req.body);
    if (result) {
      res.json({ message: 'Staff updated successfully' });
    } else {
      res.status(400).json({ message: 'No changes made' });
    }
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update staff', error: err.message });
  }
};
