import pool from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Address {
  street: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
}

export interface User extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  email: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
  role: "Student" | "Staff" | "Admin";
  address?: string; 
}

export interface UserWithAddress extends User {
  street: string | null;
  city: string | null;
  state: string | null;
  pin_code: string | null;
  country: string | null;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.execute<User[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] ?? null;
};

export const createUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  phone_number: string,
  gender: string,
  date_of_birth: string,
  role: string
): Promise<number> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO users (first_name, last_name, email, password, phone_number, gender, date_of_birth, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, password, phone_number, gender, date_of_birth, role]
  );
  return result.insertId;
};

export const getUserDetails = async (userId: string): Promise<User | null> => {
  const [rows] = await pool.execute<UserWithAddress[]>(
    `SELECT 
      users.id, users.first_name, users.last_name, users.email, 
      users.phone_number, users.gender, users.date_of_birth, users.role,
      address.street, address.city, address.state, address.pin_code, address.country
     FROM users 
     LEFT JOIN address ON users.id = address.user_id 
     WHERE users.id = ?`,
    [userId]
  );

  if (!rows[0]) return null;

  const user = rows[0];
  user.full_name = `${user.first_name} ${user.last_name}`;
  if (user.street) {
    user.address = `${user.street}, ${user.city}, ${user.state} - ${user.pin_code}, ${user.country}`;
  }

  return user;
};

export const updateUserDetails = async (
  userId: string,
  user: Partial<User>
): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE users u 
     SET u.first_name = ?, u.last_name = ?, u.email = ?, u.phone_number = ?, u.gender = ?, u.date_of_birth = ?  
     WHERE u.id = ?`,
    [user.first_name, user.last_name, user.email, user.phone_number, user.gender, user.date_of_birth, userId]
  );
  return result.affectedRows > 0;
};

export const updateUserAddress = async (
  userId: string,
  address: Address
): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO address (user_id, street, city, state, pin_code, country) 
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE street = ?, city = ?, state = ?, pin_code = ?, country = ?`,
    [
      userId,
      address.street,
      address.city,
      address.state,
      address.pin_code,
      address.country,
      address.street,
      address.city,
      address.state,
      address.pin_code,
      address.country,
    ]
  );
  return result.affectedRows > 0;
};

export const addCoursesToStudent = async (
  userId: string,
  batchIds: string[],
  status = "enrolled"
): Promise<boolean> => {
  try {
    const enrollmentPromises = batchIds.map((batchId) =>
      pool.execute<ResultSetHeader>(
        "INSERT INTO enrollment (student_id, batch_id, status) VALUES (?, ?, ?)",
        [userId, parseInt(batchId), status]
      )
    );
    const results = await Promise.all(enrollmentPromises);
    return results.every(([result]) => result.affectedRows > 0);
  } catch {
    return false;
  }
};

export const addCoursesToStaff = async (
  staffId: string,
  courseIds: string[]
): Promise<boolean> => {
  try {
    const assignPromises = courseIds.map((courseId) =>
      pool.execute<ResultSetHeader>(
        "INSERT INTO course_instructors (staff_id, course_id) VALUES (?, ?)",
        [staffId, parseInt(courseId)]
      )
    );
    const results = await Promise.all(assignPromises);
    return results.every(([result]) => result.affectedRows > 0);
  } catch {
    return false;
  }
};
