const fs = require('fs');

// 루트 경로 찾을 수 있는 모듈
const appRoot = require('app-root-path');
const accessLogStream = fs.createWriteStream(`${appRoot}/log/access.log`, {
    flags: 'a',
});

module.exports = accessLogStream;
