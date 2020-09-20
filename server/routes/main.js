const express = require('express');
const router = express.Router();
const  userAPIControllerWithPassport = require('../controller/userAPIControllerWithPassport')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const tokenList = {};


router.get('/status', (req, res, next) => {
    res.status(200).json({ 'status': 'ok' });
});

router.post('/signup', passport.authenticate('signup',{ session: false }), userAPIControllerWithPassport.signup);


router.post('/login', userAPIControllerWithPassport.login);

router.get('/logout', userAPIControllerWithPassport.logout);

router.post('/token', userAPIControllerWithPassport.token);


module.exports = router;