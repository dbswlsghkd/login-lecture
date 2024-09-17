'use strict';

// const UserStorage = require('../../models/UserStorage');
const logger = require('../../config/logger');
const User = require('../../models/User');

const output = {
    // 렌더링 해주는 함수
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render('home/index');
    },

    login: (req, res) => {
        logger.info(`GET / login 200 "로그인 화면으로 이동"`);
        res.render('home/login');
    },
    register: (req, res) => {
        logger.info(`GET / register 200 "회원가입 화면으로 이동"`);
        res.render('home/register');
    },
};

const process = {
    // 렌더링 해주는 함수
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.err) {
            logger.error(
                `POST / login 200 Response: "success:" ${response.success}, msg: ${response.err}`
            );
        } else
            logger.info(
                `POST / login 200 Response: "success:" ${response.success}, msg: ${response.msg}`
            );
        return res.json(response);
        // const id = req.body.id,
        //     psword = req.body.psword;
        // // const userStorage = new UserStorage();
        // // 특정 데이터만 불러올 수 있음
        // const users = UserStorage.getUsers('id', 'psword');
        // // console.log(users.psword);
        // const response = {};
        // if (users.id.includes(id)) {
        //     const idx = users.id.indexOf(id);
        //     if (users.psword[idx] === psword) {
        //         response.success = true;
        //         return res.json(response);
        //     }
        // }
        // response.success = false;
        // response.msg = '로그인에 실패하셨습니다.';
        // return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if (response.err) {
            logger.error(
                `POST / register 200 Response: "success:" ${response.success}, msg: ${response.err}`
            );
        } else
            logger.info(
                `POST / register 200 Response: "success:" ${response.success}, msg: ${response.msg}`
            );
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
