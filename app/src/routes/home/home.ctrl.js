'use strict';

const UserStorage = require('../../models/UserStorage');

const output = {
    // 렌더링 해주는 함수
    home: (req, res) => {
        res.render('home/index');
    },

    login: (req, res) => {
        res.render('home/login');
    },
};

const process = {
    // 렌더링 해주는 함수
    login: (req, res) => {
        const id = req.body.id,
            psword = req.body.psword;

        // const userStorage = new UserStorage();
        // 특정 데이터만 불러올 수 있음
        const users = UserStorage.getUsers('id', 'psword');

        // console.log(users.psword);
        const response = {};
        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword) {
                response.success = true;
                return res.json(response);
            }
        }
        response.success = false;
        response.msg = '로그인에 실패하셨습니다.';
        return res.json(response);
    },
};

// object로 생성
module.exports = {
    output,
    process,
    // hello : hello,
    // login : login,
    // (key : value) 구조를 단순화 시킬 수 있음
};
