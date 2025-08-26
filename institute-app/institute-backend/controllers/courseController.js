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
    for (const course of courses) {
      const [batches] = await pool.execute('SELECT * FROM batch WHERE course_id = ?', [course.id]);
      course.batches = batches;
    }
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching course details' });
  }
};

const addCourse = async (req, res) => {
  const { course_name, course_code, description, duration } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO course (course_name, course_code, description, duration) VALUES (?, ?, ?, ?)',
      [course_name, course_code, description, duration]
    );
    res.status(201).json({ message: 'Course added', courseId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding course' });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course_name, course_code, description, duration } = req.body;
  try {
    const [result] = await pool.execute(
      'UPDATE course SET course_name = ?, course_code = ?, description = ?, duration = ? WHERE id = ?',
      [course_name, course_code, description, duration, id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const [batches] = await pool.execute('SELECT id FROM batch WHERE course_id = ?', [id]);
    const batchIds = batches.map(b => b.id);
    if (batchIds.length > 0) {
      await pool.execute(`DELETE FROM enrollment WHERE batch_id IN (${batchIds.map(() => '?').join(',')})`, batchIds);
      await pool.execute(`DELETE FROM batch WHERE id IN (${batchIds.map(() => '?').join(',')})`, batchIds);
    }
    await pool.execute('DELETE FROM enrollment WHERE course_id = ?', [id]);
    await pool.execute('DELETE FROM course_instructors WHERE course_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM course WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

module.exports = { getCourseDetails, addCourse, updateCourse, deleteCourse };
