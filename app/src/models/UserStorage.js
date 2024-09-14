'use strict';

// fs 모듈 가져오기, promises 비동기 처리에 아주 효과적
const fs = require('fs').promises;

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
    static getUsers(isAll, ...fields) {
        return (
            fs
                .readFile('./src/databases/users.json')
                // 성공 시
                .then((data) => {
                    return this.#getUsers(data, isAll, fields);
                })
                // 에러 시
                .catch(console.error)
        );
    }

    static getUserInfo(id) {
        // const users = this.#users;
        // promise에 접근을 하면 then() 이라는 함수 사용 가능
        return (
            fs
                .readFile('./src/databases/users.json')
                // 성공 시
                .then((data) => {
                    return this.#getUserInfo(data, id);
                })
                // 에러 시
                .catch(console.error)
        );
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        // 모든 값을 다 가져오겠다
        // console.log(users, 'users');

        if (users.id.includes(userInfo.id)) {
            throw '이미 존재하는 아이디입니다.';
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        // 데이터 추가
        fs.writeFile('./src/databases/users.json', JSON.stringify(users));
        return { success: true };
    }
}

module.exports = UserStorage;
