const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/', (req, res) => {
    const token = req.cookies.user;
    if (!token) res.render('index', { isToken: false });
    else {
        res.render('index', { isToken: true });
    }
});

module.exports = router;
