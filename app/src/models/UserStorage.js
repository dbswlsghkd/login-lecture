'use strict';

const db = require('../config/db');

class UserStorage {
    // 은닉화 함수
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        // console.log(userInfo, 'userInfo');
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        // const users = this.#users;
        const users = JSON.parse(data);
        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            // 해당 키값이 있는지 판단 ture 반환
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        // console.log(newUsers);
        return newUsers;
    }

    // 데이터를 은닉화하여 메소드로 전달하였음
    // ...fields는 함수에서 선언한 값만 들고 올 수있도록 설정 -> [ 'id', 'psword' ]
    static getUsers(isAll, ...fields) {}

    static getUserInfo(id) {
        // Promise 시간이 오래걸릴 때 사용하는 구문
        return new Promise((resolve, reject) => {
            db.request()
                .input('id', id)
                .query('select * from users where id = @id', (err, data) => {
                    if (err) reject(err);
                    resolve(data[0]);
                });
        });
    }

    static async save(userInfo) {}
}

module.exports = UserStorage;
