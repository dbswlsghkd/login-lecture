'use strict';

const home = (req, res) => {
    res.render('home/index');
};

const login = (req, res) => {
    res.render('home/login');
};

// object로 생성
module.exports = {
    home,
    login,
    // hello : hello,
    // login : login,
    // (key : value) 구조를 단순화 시킬 수 있음
};
