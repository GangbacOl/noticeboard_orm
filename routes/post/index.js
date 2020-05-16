const express = require('express');
const models = require('../../models');
const jwt = require('jsonwebtoken');
const postMiddleware = require('../../middlewares/post/post');

const router = express.Router();
router.use(express.json());

router.get('/write', (req, res) => {
    res.render('post/writePost', {});
});

// 포스트 작성
router.post('/write', (req, res) => {
    const { title, content } = req.body;
    const author = postMiddleware.username;
    const secret = req.app.get('jwt-secret');
    const token = req.cookies.user;
    // ''일때 DB에서 NULL값으로 인식하지 못하는것.

    if (!token) res.status(403).json({ message: '접근권한이 없음.' });

    let accessFlag = jwt.verify(token, secret);
    console.log(jwt.verify(token, secret));

    if (accessFlag) {
        models.post
            .create({
                title,
                author,
                content,
            })
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    message: '포스트 작성 실패',
                    err,
                });
            });
    } else if (!accessFlag) {
        res.json({ message: '접근권한이 없음' });
    }
});

// 포스트  읽기
router.get('/read', (req, res) => {
    const secret = req.app.get('jwt-secret');

    if (!req.headers.cookie)
        res.status(403).json({ message: '접근권한이 없음.' });
    const token = req.cookies.user;

    let accessFlag = jwt.verify(token, secret);

    if (accessFlag) {
        models.post.findAll().then((posts) => {
            res.json({
                message: '포스트 조회 성공',
                posts,
            });
        });
    }
});

// 포스트 업데이트
router.put('/update/:id', (req, res) => {});

// 포스트 삭제
router.delete('delete/:id', (req, res) => {
    // const id = req.params.id;
    // const secret = req.app.get('jwt-secret');
    // if (!req.headers.cookie)
    //     res.status(403).json({ message: '접근권한이 없음.' });
    // const token = req.headers.cookie.replace('user=', '');
    // let accessFlag = jwt.verify(token, secret);
    // if (accessFlag) {
    //     models.post
    //         .destroy({
    //             where: { id },
    //         })
    //         .then(() => {});
    // }
});

module.exports = router;
