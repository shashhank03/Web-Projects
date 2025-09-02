import { Router } from 'express';
import { getCourseDetails, addCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getCourseDetails);
router.post('/add', authenticateUser, authorizeAdmin, addCourse);
router.put('/:id', authenticateUser, authorizeAdmin, updateCourse);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteCourse);

export default router;
