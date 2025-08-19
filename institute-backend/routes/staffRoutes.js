const express = require('express');
const router = express.Router();
const { getStaffDetails, addStaff } = require('../controllers/staffController');

router.get('/', getStaffDetails);
router.post('/add', addStaff);

module.exports = router;
