const express = require('express');
const models = require('../../models');
const jwt = require('jsonwebtoken');
const postMiddleware = require('../../middlewares/post/post');

const router = express.Router();
router.use(express.json());

router.post('/signup', (req, res) => {
    const { id, password, username } = req.body;
    if (!id || !password || !username) {
        res.render('auth/error', {
            message: '회원가입 실패(회원 정보 미기입)',
            type: 'signup',
        });
    } else {
        models.user
            .create({
                account: id,
                password: password,
                username: username,
            })
            .then((result) => {
                console.log('데이터 추가 완료: ' + result);
                res.redirect('/signin');
            })
            .catch((err) => {
                console.log('데이터 추가 실패' + err);
                res.render('auth/error', {
                    message: '회원가입 실패',
                    type: 'signup',
                });
            });
    }
});

router.post('/signin', (req, res) => {
    const { id, password } = req.body;
    const secret = req.app.get('jwt-secret');

    models.user
        .findOne({
            where: { account: id },
        })
        .then((userInfo) => {
            // 로그인 실패 시
            if (userInfo === null)
                res.render('auth/error', {
                    message: '로그인 실패',
                    type: 'signin',
                });
            // 패스워드 오류 시
            else if (userInfo.dataValues.password !== password)
                res.render('auth/error', {
                    message: '패스워드가 일치하지 않음',
                    type: 'signin',
                });
            // 로그인 성공 시
            else if (userInfo.dataValues.password === password) {
                const token = jwt.sign(
                    {
                        _id: id,
                        username: userInfo.dataValues.username,
                    },
                    secret,
                    {
                        expiresIn: '5d',
                        issuer: 'localhost',
                        subject: 'userInfo',
                    }
                );
                postMiddleware.getUsername(userInfo.dataValues.username);
                res.cookie('user', token).redirect('/');
            }
        });
});

module.exports = router;
