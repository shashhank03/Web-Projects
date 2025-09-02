import { Router } from 'express';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';
import { createBatch, completeBatch, getBatches, editBatch, deleteBatch } from '../controllers/batchController';

const router = Router();

router.post('/', authenticateUser, authorizeAdmin, createBatch);
router.put('/:id/complete', authenticateUser, authorizeAdmin, completeBatch);
router.get('/', authenticateUser, getBatches);
router.put('/:id', authenticateUser, authorizeAdmin, editBatch);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteBatch);

export default router;
