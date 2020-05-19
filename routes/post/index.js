const express = require('express');
const postMiddleware = require('../../middlewares/post/post');
const authMiddleware = require('../../middlewares/auth/auth');

const router = express.Router();
router.use(express.json());

router.get('/write', (req, res) => {
    res.render('post/writePost', {});
});

router.get('/update/:id', (req, res) => {
    const id = req.params.id;
    postMiddleware.readOnePost(res, id);
});

// 포스트 작성
router.post('/write', (req, res) => {
    const { title, content } = req.body;
    const author = postMiddleware.username;
    if (!title || !content) {
        res.render('post/error', {
            message: '포스트 정보 미기입.',
            type: 'create',
        });
    } else {
        if (authMiddleware(req, res)) {
            postMiddleware.createPost(res, title, content, author);
        }
    }
});

// 포스트 업데이트
router.post('/update/:id', (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!title || !content) {
        res.render('post/error', {
            message: '포스트 정보 미기입.',
            type: 'update',
            postId: id,
        });
    } else {
        if (authMiddleware(req, res)) {
            postMiddleware.updatePost(req, res, id, title, content);
        }
    }
});

// 포스트 삭제
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (authMiddleware(req, res)) {
        postMiddleware.deletePost(res, id);
    }
});

module.exports = router;
