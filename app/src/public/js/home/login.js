'use strict';

const id = document.querySelector('#id'),
    psword = document.querySelector('#psword'),
    loginBtn = document.querySelector('button');

// console.log(id, psword, loginBtn);

// const login = () => {
//     console.log('bye');
// };

loginBtn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        psword: psword.value,
    };
    // console.log(req);
    // console.log(JSON.stringify(req));

    // server로 json 데이터를 보내는 형식
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req), // JSON화 시키는 함수
    })
        .then((res) => res.json())
        // .then((res) => console.log(res)); // 데이터를 가져오는 then 함수
        // .then((console.log)); // 간추려서 사용도 가능
        .then((res) => {
            console.log(res, 'res');
            if (res.success) {
                location.href = '/'; //루트로 이동
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // console.error(new Error('로그인 중 에러 발생'));
            console.error('로그인 중 에러 발생'); // 둘다 사용 가능
        });
}
