import { Router } from 'express';
import { getStaffDetails, addStaff, getStaffCourses, deleteStaff, updateStaff, assignCoursesToStaff } from '../controllers/staffController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateUser, getStaffDetails);
router.post('/add', authenticateUser, authorizeAdmin, addStaff);
router.put('/:id', authenticateUser, authorizeAdmin, updateStaff);
router.put('/self/:id', authenticateUser, updateStaff);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteStaff);
router.get('/get-courses', authenticateUser, getStaffCourses);
router.post('/add-courses', authenticateUser, assignCoursesToStaff);

export default router;
