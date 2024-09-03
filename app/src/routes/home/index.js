'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.home);

router.get('/login', ctrl.login);
// router.post('/login', ctrl.login);

// 외부에서 접근 가능하도록 사용하는 구문
module.exports = router;
