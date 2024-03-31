const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile');
const { findUnpaid, pay } = require('../controller/jobController');

router.get('/unpaid', getProfile, findUnpaid)
router.post('/:job_id/pay', getProfile, pay)

module.exports = router;