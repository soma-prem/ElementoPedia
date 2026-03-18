const express = require('express');
const { getElements } = require('../controllers/elementController');

const router = express.Router();

router.get('/', getElements);

module.exports = router;