const express = require('express');
const { bestProfession, bestClients } = require('../controller/adminController');
const router = express.Router();
const {bestProfessionValidation, bestClientsValidation} = require('./schemas/adminValidation')


router.get('/best-profession', bestProfessionValidation, bestProfession)
router.get('/best-clients', bestClientsValidation, bestClients)

module.exports = router;