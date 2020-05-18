const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
    const token = req.cookies.user;
    const secret = req.app.get('jwt-secret');

    if (!token) {
        return res.status(403).json({
            message: '로그인을 하세요.',
        });
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    p.then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

module.exports = authMiddleware;
