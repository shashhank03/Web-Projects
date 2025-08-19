const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const { getStaffDetails, addStaff, getStaffCourses, deleteStaff, updateStaff, assignCoursesToStaff } = require('../controllers/staffController');

router.get('/', authenticateUser, getStaffDetails);
router.post('/add', authenticateUser, authorizeAdmin, addStaff);
router.put('/:id', authenticateUser, authorizeAdmin, updateStaff);
router.put('/self/:id', authenticateUser, updateStaff);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteStaff);
router.get('/get-courses', authenticateUser, getStaffCourses);
router.post('/add-courses', authenticateUser, authorizeAdmin, assignCoursesToStaff);

module.exports = router;
