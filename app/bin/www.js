const app = require('../app');
const logger = require('../src/config/logger');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // console.log('서버 가동');
    logger.info(`${PORT} 포트에서 서버 가동`);
});
