const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateUser, updateAddress, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile); 
router.put('/update', authenticateUser, updateUser);
router.put('/update-address', authenticateUser, updateAddress);
router.delete('/delete', authenticateUser, deleteUser);
// router.get('/admin', authenticateUser, authorizeAdmin, (req, res) => {
//   res.send('Admin page');
// });

module.exports = router;
