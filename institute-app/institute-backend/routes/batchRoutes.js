const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');
const batchController = require('../controllers/batchController');

router.post('/', authenticateUser, authorizeAdmin, batchController.createBatch);
router.put('/:id/complete', authenticateUser, authorizeAdmin, batchController.completeBatch);
router.get('/', authenticateUser, batchController.getBatches);
router.put('/:id', authenticateUser, authorizeAdmin, batchController.editBatch);
router.delete('/:id', authenticateUser, authorizeAdmin, batchController.deleteBatch);



module.exports = router;
