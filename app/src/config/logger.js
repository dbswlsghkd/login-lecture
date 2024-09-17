// winston 모듈에서 사용하고 싶은 것만 가져와서 사용할 수 있다.
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: '백엔드',
        }),
        // 파일 저장 시는 주석처리
        // colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:dd' }),
        printFormat
    ),
    console: combine(colorize(), simple()),
};

const opts = {
    // 파일 전송 방버
    file: new transports.File({
        filename: 'accesswinston.log',
        dirname: './log',
        level: 'info',
        format: printLogFormat.file,
    }),
    // 콘솔 전송 방법
    console: new transports.Console({
        level: 'info',
        format: printLogFormat.console,
    }),
};

const logger = createLogger({
    transports: [opts.file],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(opts.console);
}

module.exports = logger;
