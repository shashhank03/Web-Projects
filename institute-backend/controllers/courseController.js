const pool = require('../db');

const getCourseDetails = async (req, res) => {
  try {
    const [courses] = await pool.execute(`
      SELECT course.*, GROUP_CONCAT(DISTINCT users.first_name) AS staff_names, count(enrollment.student_id) as student_count
      from course  
      left join enrollment ON course.id = enrollment.course_id
      left join course_instructors ci ON course.id = ci.course_id
      left join users ON ci.staff_id = users.id
      GROUP BY course.id
    `);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching course details' });
  }
};

const addCourse = async (req, res) => {
  const { course_name, course_code, description, duration, start_date} = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO course (course_name, course_code, description, duration, start_date) VALUES (?, ?, ?, ?, ?)',
      [course_name, course_code, description, duration, start_date]
    );
    res.status(201).json({ message: 'Course added', courseId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding course' });
  }
};

module.exports = { getCourseDetails, addCourse };