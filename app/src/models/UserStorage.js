'use strict';

class UserStorage {
    //#은 private 변수로 선언을 하기 위함
    //static 정적 변수로 변경하여 외부에서 접근 가능하도록 변경
    static #users = {
        id: ['hyj', '개발자1', '개발자2'],
        psword: ['1234', '456', '789'],
        name: ['거북이', '돼지', '당나귀'],
    };
    // 데이터를 은닉화하여 메소드로 전달하였음
    // ...fields는 함수에서 선언한 값만 들고 올 수있도록 설정 -> [ 'id', 'psword' ]
    static getUsers(...fields) {
        const users = this.#users;
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
}

module.exports = UserStorage;
