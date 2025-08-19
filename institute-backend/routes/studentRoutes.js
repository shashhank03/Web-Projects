const express = require('express');
const router = express.Router();
const { getStudentDetails, addStudent } = require('../controllers/studentController');

router.get('/', getStudentDetails);
router.post('/add', addStudent);

module.exports = router;
