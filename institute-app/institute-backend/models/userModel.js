const pool = require('../db');

const findUserByEmail = async (email) => {
  const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return user[0];
};

const createUser = async (first_name, last_name, email, password, phone_number, gender, date_of_birth, role) => {
  const [result] = await pool.execute(
    'INSERT INTO users (first_name, last_name, email, password, phone_number, gender, date_of_birth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, password, phone_number, gender, date_of_birth, role]
  );
  return result.insertId;
};

const getUserDetails = async (userId) => {
  const [user] = await pool.execute(
    `SELECT 
      users.id, users.first_name, users.last_name, users.email, users.phone_number,  users.gender, users.date_of_birth, users.role,
      address.street,  address.city, address.state, address.pin_code, address.country
    FROM users 
    LEFT JOIN address ON users.id = address.user_id 
    WHERE users.id = ?`, 
    [userId]
  );
  if (user[0]) {
    user[0].full_name = user[0].first_name + " " + user[0].last_name;
    user[0].address = user[0].street + ", " + user[0].city + ", " + user[0].state + " - " + user[0].pin_code + ", " + user[0].country; 
  }
  return user[0];
};

const updateUserDetails = async (userId, user) => {
  const [result] = await pool.execute(
    `UPDATE users u SET u.first_name = ?, u.last_name = ?, u.email = ?, u.phone_number = ?, u.gender = ?, u.date_of_birth = ?  WHERE u.id = ?;`, 
    [user.first_name, user.last_name, user.email, user.phone_number, user.gender, user.date_of_birth, userId]
  );
  return result.affectedRows > 0;
};

const updateUserAddress = async (userId, address) => {
  const [result] = await pool.execute(
    `INSERT INTO address (user_id, street, city, state, pin_code, country) VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE street = ?, city = ?, state = ?, pin_code = ?, country = ?;`, 
    [userId, address.street, address.city, address.state, address.pin_code, address.country, address.street, address.city, address.state, address.pin_code, address.country]
  );
  return result.affectedRows > 0;
};

const addBatchesToStudent = async (userId, batchIds, status = 'enrolled') => {
  try {
    const enrollmentPromises = batchIds.map(batchId => {
      return pool.execute(
        'INSERT INTO enrollment (student_id, batch_id, status) VALUES (?, ?, ?)',
        [userId, parseInt(batchId), status]
      );
    });

    const results = await Promise.all(enrollmentPromises);
    return results.every(result => result[0].affectedRows > 0);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const addCoursesToStaff = async (staffId, courseIds) => {
  try {
    const courseInstructorPromises = courseIds.map(courseId => {
      return pool.execute(
        'INSERT INTO course_instructors (staff_id, course_id) VALUES (?, ?)',
        [staffId, parseInt(courseId)]
      );
    });
    
    const results = await Promise.all(courseInstructorPromises);
    return results.every(result => result[0].affectedRows > 0);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
module.exports = { findUserByEmail, createUser, getUserDetails, updateUserDetails, updateUserAddress, addBatchesToStudent, addCoursesToStaff };