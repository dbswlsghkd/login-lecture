'use strict';

const id = document.querySelector('#id'),
    name = document.querySelector('#name'),
    psword = document.querySelector('#psword'),
    confirmPsword = document.querySelector('#confirm-psword'),
    registerBtn = document.querySelector('#button');

// console.log('hello register');
// console.log(id, psword, registerBtn);

// const register = () => {
//     console.log('bye');
// };

registerBtn.addEventListener('click', register);

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
