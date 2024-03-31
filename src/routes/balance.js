const express = require('express');
const router = express.Router();
const { deposit } = require('../controller/balanceController')

router.post('/deposit/:userId', deposit)

module.exports = router;