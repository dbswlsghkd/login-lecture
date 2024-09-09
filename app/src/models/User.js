'use strict';

const UserStorage = require('./UserStorage');

class User {
    constructor(body) {
        this.body = body;
    }

    login() {
        // object로 바로 받을 수 있음
        // const { id, psword } = UserStorage.getUsers('id', 'psword');
        const client = this.body;
        const { id, psword } = UserStorage.getUserInfo(client.id);
        // console.log(tmp);

        if (id) {
            if (id === client.id && psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: '비밀번호가 틀렸습니다.' };
        }
        return { success: false, msg: '존재하지 않는 아이디입니다.' };
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;
