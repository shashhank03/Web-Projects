const pool = require('../db');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/userModel');

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


module.exports = { getStudentDetails, addStudent };
