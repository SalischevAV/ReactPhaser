const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const scoreAPIController = require('../controller/scoreAPIController');


router.post('/submit-score', scoreAPIController.submitScore);

// router.get('/scores', authToken, scoreAPIController.scores);
router.get('/scores', scoreAPIController.scores);

module.exports = router;