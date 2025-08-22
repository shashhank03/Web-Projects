const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const pool = require('../db');

router.get('/stats', authenticateUser, async (req, res) => {
    try {
        const [results] = await pool.execute(`
            SELECT present, absent, late FROM attendance
        `);
        
        res.json(results[0] || { present: 0, absent: 0, late: 0 });
    } catch (error) {
        console.error('Error fetching attendance stats:', error);
        res.status(500).json({ message: 'Error fetching attendance data' });
    }
});

module.exports = router;

