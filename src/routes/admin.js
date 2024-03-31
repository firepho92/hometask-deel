const express = require('express');
const { bestProfession, bestClients } = require('../controller/adminController');
const router = express.Router();


router.get('/best-profession', bestProfession)
router.get('/best-clients', bestClients)

module.exports = router;