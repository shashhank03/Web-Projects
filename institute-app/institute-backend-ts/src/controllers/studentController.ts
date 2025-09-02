import { Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, addCoursesToStudent, updateUserDetails } from '../models/userModel';

export const getStudentDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const [studentRows] = await pool.execute<any[]>(`
      SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth,
        a.street, a.city, a.state, a.pin_code, a.country
      FROM users u
      LEFT JOIN address a ON u.id = a.user_id
      WHERE u.role = 'Student'
    `);

    const studentsWithCourses = await Promise.all(studentRows.map(async student => {
      const [courses] = await pool.execute<any[]>(`
        SELECT c.id, c.course_name, c.course_code FROM enrollment e
        JOIN course c ON e.course_id = c.id
        WHERE e.student_id = ?
      `, [student.user_id]);
      return {
        ...student,
        courses: courses
      };
    }));
    res.json(studentsWithCourses);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
};

export const getStudentDetailbyId = async (req: Request, res: Response): Promise<void> => {
  try {
    const [student] = await pool.execute(`
      SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth,
        a.street, a.city, a.state, a.pin_code, a.country,
        GROUP_CONCAT(c.course_name) AS courses
      FROM users u
      LEFT JOIN address a ON u.id = a.user_id
      LEFT JOIN enrollment e ON u.id = e.student_id
      LEFT JOIN course c ON e.course_id = c.id
      WHERE u.id = ?
    `, [req.params.id]);
    res.json(student);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
};

export const addStudent = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, 'Student');
    res.status(201).json({ message: 'Student added', userId });
  } catch (err: any) {
    res.status(500).json({ message: 'Adding student failed', error: err.message });
  }
};

export const getStudentCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const [courses] = await pool.execute(`
      SELECT c.course_name, c.course_code, b.name AS batch_name, e.status
      FROM enrollment e
      JOIN batch b ON e.batch_id = b.id
      JOIN course c ON b.course_id = c.id
      WHERE e.student_id = ?
    `, [userId]);
    res.json(courses);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student courses', error: error.message });
  }
};

export const enrollStudent = async (req: Request, res: Response): Promise<void> => {
  const { student_id, batch_id, status = 'enrolled' } = req.body;
  if (!student_id || !batch_id) {
    res.status(400).json({ message: 'Missing student_id or batch_id' });
    return;
  }
  try {
    const [batchRows] = await pool.execute(
      `SELECT course_id FROM batch WHERE id = ?`,
      [batch_id]
    );
    if ((batchRows as any[]).length === 0) {
      res.status(404).json({ message: 'Batch not found' });
      return;
    }
    const course_id = (batchRows as any[])[0].course_id;
    const [result] = await pool.execute(
      `INSERT INTO enrollment (student_id, batch_id, course_id, status) VALUES (?, ?, ?, ?)`,
      [student_id, batch_id, course_id, status]
    );
    res.status(201).json({ 
      message: 'Student enrolled in batch successfully', 
      enrollmentId: (result as any).insertId 
    });
  } catch (error: any) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Error enrolling student in batch', error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM enrollment WHERE student_id = ?', [id]);
    await pool.execute('DELETE FROM address WHERE user_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM users WHERE id = ? AND role = "Student"', [id]);
    if ((result as any).affectedRows > 0) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error: any) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
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
      res.json({ message: 'Student updated successfully' });
    } else {
      res.status(400).json({ message: 'No changes made' });
    }
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update student', error: err.message });
  }
};
