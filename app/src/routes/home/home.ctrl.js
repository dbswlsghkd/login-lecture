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

const users = {
    id: ['hyj', '개발자1', '개발자2'],
    psword: ['1234', '456', '789'],
};

const process = {
    // 렌더링 해주는 함수
    login: (req, res) => {
        const id = req.body.id,
            psword = req.body.psword;

        console.log(id, psword);

        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword) {
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: '로그인에 실패하셨습니다.',
        });
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
