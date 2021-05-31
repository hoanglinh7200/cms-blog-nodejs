var mongoose = require('mongoose');
var BaseModel = require('../core/LcoreModel');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    phone: String
});

var Users = mongoose.model('User', userSchema, 'users');

class UsersModel extends BaseModel {

    constructor() {
        super();
        this.model = Users;
    }

    async getAll() {
        try {
            let data = await this.model.find({}, function (err, users) {
                return users;
            });

            return data;   
        } catch (error) {
            return {
                type: 'error',
                message: error.message
            }
        }
    }

    async createOrUpdate(data) {
        if (!data) {
            return false;
        }
        let result = await new this.model.save(function (err, user) {
            return user;
        });
        return result;
    }
}

module.exports = new UsersModel;