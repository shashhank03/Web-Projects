const express = require('express');
const router = express.Router();
const { getCourseDetails, addCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', getCourseDetails);
router.post('/add', authenticateUser, authorizeAdmin, addCourse);
router.put('/:id', authenticateUser, authorizeAdmin, updateCourse);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteCourse);

module.exports = router;
