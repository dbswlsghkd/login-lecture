// mssql 프레임워크 객체 생성
const sql = require('mssql');

// SQL 접속 설정
const pool = new sql.ConnectionPool({
    user: process.env.DB_USER, // DB 사용자 이름
    password: process.env.DB_PSWORD, // DB 사용자의 암호
    server: process.env.DB_HOST, // DB 서버 주소, localhost : 로컬호스트
    database: process.env.DB_DATABASE, // DB의 데이터베이스 이름
    options: {
        encrypt: false, // DB 서버 주소가 IP일 경우 에러 방지
        trustServerCertificate: true, // 자체 신뢰 서버 인증
    },
});

// 데이터베이스 연결
pool.connect((err) => {
    // 연결이 안될 경우 에러 내용 콘솔에 출력
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    // 연결에 성공할 경우 연결 성공 메시지 콘솔에 출력
    console.log('Connected to database!');
});

module.exports = pool;
