const express = require('express');
const router = express.Router();
const { deposit } = require('../controller/balanceController')
const { depositValidation } = require('./schemas/balanceValidation')

router.post('/deposit/:userId', depositValidation, deposit)

module.exports = router;