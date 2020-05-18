const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
    const token = req.cookies.user;
    const secret = req.app.get('jwt-secret');

    if (!token) {
        return res.status(403).json({
            message: '로그인을 하세요.',
        });
    }
    const accessFlag = jwt.verify(token, secret, (err, decoded) => {
        if (err) return false;
        else return true;
    });

    return accessFlag;
};

module.exports = authMiddleware;
