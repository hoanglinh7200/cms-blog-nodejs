require('dotenv').config();

var express = require('express');
var app = express();
var apiRouter = require('./routes/api');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const basicAuth = require("./api/policies/basicAuth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var whitelist = ['http://nodejs.test', 'http://localhost:3005'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (whitelist.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SECRET_CODE,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000*60*30
        },
    })
);
app.use(cookieParser(process.env.SECRET_CODE));
app.use(passport.initialize());
app.use(passport.session());
basicAuth(passport);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(422).json({ type: 'error', message: 'Có lỗi xảy ra xin vui lòng thử lại!' });
        }
        
        if (!user) {
            console.log(info);
            res.status(200).json({ type: 'error', message: 'Tài khoản hoặc mật khẩu không chính xác.' });
        }

        else {
            req.logIn(user, (err) => {
                if (err) {
                    res.status(422).json({ type: 'error', message: 'Có lỗi xảy ra xin vui lòng thử lại!' });
                }

                res.status(200).json({ type: 'success', message: 'Đăng nhập thành công!' });
            });
        }
    })(req, res, next)
});

app.use('/api/user', (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            res.status(422).json({ type: 'error', message: 'Có lỗi xảy ra xin vui lòng thử lại!' });
        }
        
        if (!user) {
            res.status(422).json({ type: 'error', message: 'Vui lòng đăng nhập để sử dụng.' });
        }
        next();
    })(req, res, next);
}, apiRouter.userRouter);

app.listen(2000);