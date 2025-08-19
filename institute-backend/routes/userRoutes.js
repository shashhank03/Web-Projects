const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile); 

module.exports = router;
