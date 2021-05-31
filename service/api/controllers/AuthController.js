
var UsersModel = require('../models/User');

class AuthController {

    constructor() {
        this.data = UsersModel;
    }

    async login() {
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
}

module.exports = AuthController;