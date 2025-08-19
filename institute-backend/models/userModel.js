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

module.exports = { findUserByEmail, createUser, getUserDetails };
