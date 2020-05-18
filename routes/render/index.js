const express = require('express');
const postMiddleware = require('../../middlewares/post/post');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('auth/signin', {});
});

router.get('/signup', (req, res) => {
    res.render('auth/signup', {});
});

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

router.get('/', (req, res) => {
    const token = req.cookies.user;
    if (!token) res.render('index', { isToken: false });
    else {
        postMiddleware.readAllPost(res);
    }
});

module.exports = router;
