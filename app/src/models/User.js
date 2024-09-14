'use strict';
const { response } = require('express');
const UserStorage = require('./UserStorage');

class User {
    constructor(body) {
        this.body = body;
    }

    // 비동기 함수
    async login() {
        // object로 바로 받을 수 있음
        // const { id, psword } = UserStorage.getUsers('id', 'psword');
        const client = this.body;
        // await 은 async 함수 안에서 사용 가능
        const { id, psword } = await UserStorage.getUserInfo(client.id);
        // console.log(await UserStorage.getUserInfo(client.id), 'User.js');
        // console.log(tmp);

        if (id) {
            if (id === client.id && psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: '비밀번호가 틀렸습니다.' };
        }
        return { success: false, msg: '존재하지 않는 아이디입니다.' };
    }

    async register() {
        const client = this.body;
        // 데이터 저장시 시간이 오래 걸릴 수 있기 때문에 await 걸어둠
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
