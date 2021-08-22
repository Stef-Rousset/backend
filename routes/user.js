const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

route.post('/signup', userCtrl.signup);
route.pos('/login', userCtrl.login);

module.exports = router;
