const express = require('express');
const router = express.Router();
const scoreAPIController = require('../controller/scoreAPIController');


router.post('/submit-score', scoreAPIController.submitScore);


router.get('/scores', scoreAPIController.scores);

module.exports = router;