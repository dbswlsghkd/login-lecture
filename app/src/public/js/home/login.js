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
    console.log(req);
    console.log(JSON.stringify(req));

    // server로 json 데이터를 보내는 형식
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req), // JSON화 시키는 함수
    });
}