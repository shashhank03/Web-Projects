const express = require('express');
const router = express.Router();
const { getCourseDetails, addCourse } = require('../controllers/courseController');

router.get('/', getCourseDetails);
router.post('/add', addCourse);

module.exports = router;
