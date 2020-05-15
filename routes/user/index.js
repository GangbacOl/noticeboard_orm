const express = require('express');
const models = require('../../models');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(express.json());

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

router.post('/signup', (req, res) => {
    const { id, password, username } = req.body;
    models.user
        .create({
            account: id,
            password: password,
            username: username,
        })
        .then((result) => {
            console.log('데이터 추가 완료');
            res.redirect('/user/signin');
            // res.json({ message: '회원가입 성공' });
        })
        .catch((err) => {
            console.log('데이터 추가 실패');
            console.log(err);
            res.json({ message: '회원가입 실패' });
        });
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
            if (userInfo === null) res.json({ message: '로그인 실패' });
            // 패스워드 오류 시
            else if (userInfo.dataValues.password !== password)
                res.json({ message: '패스워드가 일치하지 않음' });
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
                res.cookie('user', token).redirect('/');
            }
        });
});

module.exports = router;
