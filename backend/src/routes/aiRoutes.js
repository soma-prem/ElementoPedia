const express = require('express');
const { askElemind } = require('../controllers/aiController');

const router = express.Router();

router.post('/ask-elemind', askElemind);

module.exports = router;