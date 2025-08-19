const express = require('express');
const router = express.Router();
const { getStudentDetails, addStudent, updateStudent, deleteStudent, getStudentCourses, enrollStudent } = require('../controllers/studentController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', getStudentDetails);
router.post('/add', authenticateUser, authorizeAdmin, addStudent);
router.put('/:id', authenticateUser, authorizeAdmin, updateStudent);
router.put('/self/:id', authenticateUser, updateStudent);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteStudent);
router.get('/get-courses', authenticateUser, getStudentCourses);
router.post('/add-courses', authenticateUser, enrollStudent);

module.exports = router;
