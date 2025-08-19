
const pool = require('../db');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser, updateUserDetails, addCoursesToStaff } = require('../models/userModel');

const getStaffDetails = async (req, res) => {
  try {
    const [staff] = await pool.execute(`
      SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth,
        a.street, a.city, a.state, a.pin_code, a.country,
        GROUP_CONCAT(c.course_name) AS courses
      FROM users u
      LEFT JOIN address a ON u.id = a.user_id
      LEFT JOIN course_instructors ci ON u.id = ci.staff_id
      LEFT JOIN course c ON ci.course_id = c.id
      WHERE u.role = 'Staff'
      GROUP BY u.id, u.first_name, u.last_name, u.email, u.phone_number, u.gender, u.date_of_birth, a.street, a.city, a.state, a.pin_code, a.country
    `);
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff details' });
  }
};

const addStaff = async (req, res) => {
  const { first_name, last_name, email, password, phone_number, gender, date_of_birth } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(first_name, last_name, email, hashedPassword, phone_number, gender, date_of_birth, role='Staff');

    res.status(201).json({ message: 'Staff added', userId });
  } catch (err) {
    res.status(500).json({ message: 'Adding staff failed', error: err.message });
  }
};

const getStaffCourses = async (req, res) => {
  try{
    const [courses] = await pool.execute(`
      SELECT c.course_name, c.course_code, ci.staff_id FROM course c
      JOIN course_instructors ci ON c.id = ci.course_id WHERE ci.staff_id = ?
    `, [req.user.id]);
    res.json(courses);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff courses' });
  }
};

const assignCoursesToStaff = async (req, res) => {
  const { staff_id, course_id } = req.body;
  try {
    const courseIds = Array.isArray(course_id) ? course_id : [course_id];
    const result = await addCoursesToStaff(staff_id, courseIds);
    if (result) {
      res.json({ message: 'Courses assigned successfully' });
    } else {
      res.status(400).json({ message: 'Failed to assign courses' });
    }
  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ message: 'Assignment failed', error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.execute('DELETE FROM course_instructors WHERE staff_id = ?', [id]);
    await pool.execute('DELETE FROM address WHERE user_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM users WHERE id = ? AND role = "Staff"', [id]);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'Staff deleted successfully' });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete staff', error: error.message });
  }
};

const updateStaff = async (req, res) => {
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
      res.json({ message: 'Staff updated successfully' });
    } else {
      res.status(400).json({ message: 'No changes made' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update staff', error: err.message });
  }
};

module.exports = { getStaffDetails, addStaff, updateStaff, deleteStaff, getStaffCourses, assignCoursesToStaff };
