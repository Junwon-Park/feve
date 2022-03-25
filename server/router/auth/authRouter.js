const express = require('express');
const router = express.Router();

const { auth } = require('../../controller/auth/auth.js');

router.get('/checktoken', auth);

module.exports = router;
