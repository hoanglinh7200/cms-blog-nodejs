var UsersModel = require('../models/User');
const bcrypt = require("bcrypt-nodejs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, next) => {
            UsersModel.model.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return next(null, false);
                user.password = bcrypt.hashSync(user.password);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return next(null, user);
                    } else {
                        return next(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((user, next) => {
        next(null, user.id);
    });
    
    passport.deserializeUser((id, next) => {
        UsersModel.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username,
            };
            next(err, userInformation);
        });
    });
};
