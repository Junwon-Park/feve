const express = require('express');
const { body } = require('express-validator');
const { cscenter } = require('../../controller/admin/cscenter.js');

const router = express.Router();

router.get('/', cscenter);

module.exports = router;
