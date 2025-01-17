'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

// id 중복 체크
router.post('/idChk', ctrl.process.duplicateChk);

// 외부에서 접근 가능하도록 사용하는 구문
module.exports = router;
