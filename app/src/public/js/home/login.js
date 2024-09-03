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
}
