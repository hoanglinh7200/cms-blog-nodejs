const jwt = require('jsonwebtoken'),
    async = require('async'),
    valueLocal = require('../config/local');

module.exports = function (req, res, next) {
    var token = typeof req.headers.authorization != 'undefined' ? req.headers.authorization.replace('Bearer ', '') : '';

    if (!token || token.length <= 0) { // there is no token inside request
        return res.status(401).send('Vui lòng đăng nhập để sử dụng.');
    } else {
        jwt.verify(token, sails.config.secretKey, function (err, user) { // validate token failed
            if (err) {
                return res.status(401).send('Không xác thực được tài khoản. Vui lòng đăng nhập lại.');
            } else {
                if (user) {
                    req.user = user;
                    return next(); // passed
                } else { // no matching user for request token
                    return res.status(401).send('Vui lòng đăng nhập để sử dụng.');
                }
            }
        });
    }
};