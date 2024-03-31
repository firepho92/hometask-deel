const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile')
const { findAll, findById } = require('../controller/contractController')

router.get('/:id',getProfile, findById)

router.get('/', getProfile, findAll)

module.exports = router;