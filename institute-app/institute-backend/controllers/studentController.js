const pool = require('../db');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser, addCoursesToStudent, updateUserDetails } = require('../models/userModel');

const getStudentDetails = async (req, res) => {
  try {
    const [students] = await pool.execute(`
      SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth,
        a.street, a.city, a.state, a.pin_code, a.country,
        GROUP_CONCAT(c.course_name) AS courses
      FROM users u
      LEFT JOIN address a ON u.id = a.user_id
      LEFT JOIN enrollment e ON u.id = e.student_id
      LEFT JOIN course c ON e.course_id = c.id
      WHERE u.role = 'Student'
      GROUP BY u.id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth, a.street, a.city, a.state, a.pin_code, a.country
    `);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
};

const getStudentDetailbyId = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
}

const addStudent = async (req, res) => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, role='Student');
    res.status(201).json({ message: 'Student added', userId });
  } catch (err) {
    res.status(500).json({ message: 'Adding student failed', error: err.message });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const [courses] = await pool.execute(`
      SELECT c.course_name, c.course_code, b.name AS batch_name, e.status
      FROM enrollment e
      JOIN batch b ON e.batch_id = b.id
      JOIN course c ON b.course_id = c.id
      WHERE e.student_id = ?
    `, [req.user.id]);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching student courses', error: error.message });
  }
};

const enrollStudent = async (req, res) => {
  const { student_id, batch_id, status = 'enrolled' } = req.body;

  if (!student_id || !batch_id) {
    return res.status(400).json({ message: 'Missing student_id or batch_id' });
  }

  try {
    const [batchRows] = await pool.execute(
      `SELECT course_id FROM batch WHERE id = ?`,
      [batch_id]
    );

    if (batchRows.length === 0) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    const course_id = batchRows[0].course_id;

    const [result] = await pool.execute(
      `INSERT INTO enrollment (student_id, batch_id, course_id, status) VALUES (?, ?, ?, ?)`,
      [student_id, batch_id, course_id, status]
    );

    res.status(201).json({ 
      message: 'Student enrolled in batch successfully', 
      enrollmentId: result.insertId 
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Error enrolling student in batch', error: error.message });
  }
};


const deleteStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.execute('DELETE FROM enrollment WHERE student_id = ?', [id]);
    
    await pool.execute('DELETE FROM address WHERE user_id = ?', [id]);
    
    const [result] = await pool.execute('DELETE FROM users WHERE id = ? AND role = "Student"', [id]);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE email = ? AND id != ?', 
      [req.body.email, id]
    );
    
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists for another user' });
    }

    const result = await updateUserDetails(id, req.body);
    if (result) {
      res.json({ message: 'Student updated successfully' });
    } else {
      res.status(400).json({ message: 'No changes made' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update student', error: err.message });
  }
};

module.exports = { getStudentDetails, addStudent, updateStudent, deleteStudent, getStudentCourses, enrollStudent };
