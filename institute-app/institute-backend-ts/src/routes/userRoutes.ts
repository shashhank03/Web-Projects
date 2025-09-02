import { Router } from 'express';
import { register, login, getProfile, updateUser, updateAddress, deleteUser } from '../controllers/userController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile);
router.put('/update', authenticateUser, updateUser);
router.put('/update-address', authenticateUser, updateAddress);
router.delete('/delete', authenticateUser, deleteUser);

export default router;
