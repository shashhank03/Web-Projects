import { Router } from 'express';
import { getStudentDetails, addStudent, updateStudent, deleteStudent, getStudentCourses, enrollStudent } from '../controllers/studentController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateUser, getStudentDetails);
router.post('/add', authenticateUser, authorizeAdmin, addStudent);
router.put('/:id', authenticateUser, authorizeAdmin, updateStudent);
router.put('/self/:id', authenticateUser, updateStudent);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteStudent);
router.get('/get-courses', authenticateUser, getStudentCourses);
router.post('/add-courses', authenticateUser, enrollStudent);
router.post('/enroll', authenticateUser, enrollStudent);

export default router;
