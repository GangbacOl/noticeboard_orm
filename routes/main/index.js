const express = require('express');
const router = express.Router();
const postMiddleware = require('../../middlewares/post/post');

router.get('/', (req, res) => {
    const token = req.cookies.user;
    if (!token) res.render('index', { isToken: false });
    else {
        postMiddleware.readAllPost(res);
    }
});

module.exports = router;
