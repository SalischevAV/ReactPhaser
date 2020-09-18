const express = require('express');
const router = express.Router();


router.post('/submit-score', (req, res, next)=>{
    res.status(200).json({ 'status': 'ok' });
});

router.get('/score', (req, res, next)=>{
    res.status(200).json({ 'status': 'ok' });
});

module.exports = router;