const express = require('express');
const router = express.Router();
const userAPIController = require('../controller/userAPIController');
const authToken = require('../middleware/authToken');

router.get('/status', (req, res, next) => {
    res.status(200).json({ 'status': 'ok' });
});

router.post('/signup', userAPIController.signup);

router.post('/login', userAPIController.login);
router.get('/login', authToken, userAPIController.auth);

router.post('/logout', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});


module.exports = router;