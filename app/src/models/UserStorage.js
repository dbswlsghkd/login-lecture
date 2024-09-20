'use strict';

const db = require('../config/db');

class UserStorage {
    static getUserInfo(id) {
        // Promise 시간이 오래걸릴 때 사용하는 구문
        return new Promise((resolve, reject) => {
            // let sql = 'select * from users where id = @id';
            let storedProcedureName = 'up_selectUserInfo';
            db.request()
                .input('id', id)
                // 쿼리 사용방식
                // .query(sql, (err, data) => {
                //     if (err) reject(`${err}`);
                //     else resolve(data.recordset[0]);
                // })
                // 프로시저 사용방식
                .execute(storedProcedureName, (err, result) => {
                    // 프로시저 호출
                    if (err) reject(`${err}`);
                    else resolve(result.recordset[0]);
                });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            // let sql =
            //     'insert into users(id, psword, name) values(@id, @psword, @name)';
            let storedProcedureName = 'up_insertUserInfo';
            db.request()
                .input('id', userInfo.id)
                .input('psword', userInfo.psword)
                .input('name', userInfo.name)
                // .query(sql, (err) => {
                //     if (err) reject(`${err}`);
                //     else resolve({ success: true });
                // });
                .execute(storedProcedureName, (err, result) => {
                    if (err) {
                        reject(err.message); // 오류 발생 시 reject
                    } else {
                        // 결과 처리
                        if (result.recordset.length > 0) {
                            const message = result.recordset[0].msg; // 프로시저에서 반환된 메시지
                            resolve({ success: true, msg: message }); // 성공 시 메시지와 함께 resolve
                        } else {
                            resolve({ success: true }); // 결과가 없을 경우
                        }
                    }
                });
            // .execute(storedProcedureName, (err, result) => {
            //     console.log(result.recordset[0], 'result');
            //     console.log(err.message, 'err');
            //     return;
            //     if (err) reject(`${err}`);
            //     else resolve({ success: true });
            // });
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
