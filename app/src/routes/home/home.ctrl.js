'use strict';

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
        console.log(req.body);
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
