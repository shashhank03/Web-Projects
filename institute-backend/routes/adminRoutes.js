const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const pool = require('../db');

router.get('/enrollments', authenticateUser, authorizeAdmin, async (req, res) => {
    try {
        const [enrollments] = await pool.execute('SELECT COUNT(*) as total FROM enrollment');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enrollments' });
    }
});

module.exports = router;