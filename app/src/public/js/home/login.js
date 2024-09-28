'use strict';
const id = document.querySelector('#id'),
    psword = document.querySelector('#psword'),
    loginBtn = document.querySelector('#button');

loginBtn.addEventListener('click', login);

function login() {
    if (!id.value) return alert('아이디를 입력해주십시오');
    if (!psword.value) {
        return alert('비밀번호를 입력해주세요.');
    }

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
        .then((res) => res.json()) // 데이터를 가져오는 then 함수
        // .then((res) => res.json())
        // .then((res) => console.log(res)); // 데이터를 가져오는 then 함수
        // .then((console.log)); // 간추려서 사용도 가능
        .then((res) => {
            // console.log(res, 'res');
            if (res.success) {
                location.href = '/'; //루트로 이동
            } else {
                if (res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            // console.error(new Error('로그인 중 에러 발생'));
            console.error('로그인 중 에러 발생'); // 둘다 사용 가능
        });
}
