import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import pool from '../db';

const router = Router();

router.get('/stats', authenticateUser, async (req, res) => {
    try {
        const [results] = await pool.execute(`SELECT present, absent, late FROM attendance`);
        res.json((results as any[])[0] || { present: 0, absent: 0, late: 0 });
    } catch (error: any) {
        console.error('Error fetching attendance stats:', error);
        res.status(500).json({ message: 'Error fetching attendance data' });
    }
});

export default router;
