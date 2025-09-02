import { Router } from 'express';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';
import pool from '../db';

const router = Router();

router.get('/enrollments', authenticateUser, authorizeAdmin, async (req, res) => {
    try {
        const [enrollments] = await pool.execute('SELECT COUNT(*) as total FROM enrollment');
        res.json(enrollments);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching enrollments' });
    }
});

export default router;
