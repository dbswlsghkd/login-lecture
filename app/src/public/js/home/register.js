'use strict';

const id = document.querySelector('#id'),
    name = document.querySelector('#name'),
    psword = document.querySelector('#psword'),
    confirmPsword = document.querySelector('#confirm-psword'),
    registerBtn = document.querySelector('#button'),
    duplicateBtn = document.querySelector('#duplicate-check');

// const ctrl = require('../../routes/home/home.ctrl');
// console.log(ctrl, 'ctrl');

// const db = require('../../config/db');

// console.log('hello register');
// console.log(id, psword, registerBtn);

// const register = () => {
//     console.log('bye');
// };

registerBtn.addEventListener('click', register);

duplicateBtn.addEventListener('click', idChk);

function register() {
    if (!id.value) return alert('아이디를 입력해주십시오');
    if (psword.value !== confirmPsword.value) {
        return alert('비밀번호가 일치하지 않습니다.');
    }

    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
        // confirmPsword: confirmPsword.value,
    };
    // console.log(req);
    // console.log(JSON.stringify(req));

    // server로 json 데이터를 보내는 형식
    fetch('/register', {
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
            if (res.success) {
                location.href = '/login'; //루트로 이동
                return alert(res.msg);
            } else {
                if (res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            // console.error(new Error('로그인 중 에러 발생'));
            console.error('회원가입 중 에러 발생'); // 둘다 사용 가능
        });
}

// id 중복체크
function idChk() {
    const req = {
        id: id.value,
        // confirmPsword: confirmPsword.value,
    };
    // console.log(req);
    // console.log(JSON.stringify(req));

    // server로 json 데이터를 보내는 형식
    fetch('/idChk', {
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
            if (res.success) {
                alert(res.msg);
            } else {
                if (res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            // console.error(new Error('로그인 중 에러 발생'));
            console.error('아이디 체크 중 오류 발생'); // 둘다 사용 가능
        });
}

function onlyEnglishAndNumbers(event) {
    // 입력된 값을 가져옴
    const inputValue = event.target.value;

    // 영문자와 숫자만 허용하는 정규 표현식
    const regex = /^[a-zA-Z0-9]+$/;

    // 입력 값이 정규 표현식과 일치하지 않으면 허용되지 않는 문자를 제거
    if (!regex.test(inputValue)) {
        event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
        alert('한글, 특수문자는 입력할 수 없습니다.');
    }
}
