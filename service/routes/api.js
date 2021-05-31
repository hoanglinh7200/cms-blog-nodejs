var express = require('express');
var userRouter = express.Router();

var UsersModel = require('../api/models/User');

userRouter.get('/', async function (req, res) {
    let result = await UsersModel.getAll();
    
    res.json({
        data: result,
    });
});

userRouter.post('/', function (req, res) {
    let result = UsersModel.createOrUpdate(req.body);
    res.json(result);
});


module.exports = {
    userRouter: userRouter,
};