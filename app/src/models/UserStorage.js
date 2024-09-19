'use strict';

const db = require('../config/db');

class UserStorage {
    static getUserInfo(id) {
        // Promise 시간이 오래걸릴 때 사용하는 구문
        return new Promise((resolve, reject) => {
            let sql = 'select * from users where id = @id';
            db.request()
                .input('id', id)
                .query(sql, (err, data) => {
                    if (err) reject(`${err}`);
                    else resolve(data.recordset[0]);
                });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            let sql =
                'insert into users(id, psword, name) values(@id, @psword, @name)';
            db.request()
                .input('id', userInfo.id)
                .input('psword', userInfo.psword)
                .input('name', userInfo.name)
                .query(sql, (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                });
        });
    }

    // id 중복체크
    static getDuplicateChk(id) {
        // Promise 시간이 오래걸릴 때 사용하는 구문
        console.log(id);
        return new Promise((resolve, reject) => {
            let sql = 'select * from users where id = @id';
            db.request()
                .input('id', id)
                .query(sql, (err, data) => {
                    if (data.recordset.length === 0)
                        reject(`사용가능한 아이디입니다.`);
                    else resolve(`이미 등록된 아이디입니다.`);
                });
        });
    }
}

module.exports = UserStorage;
