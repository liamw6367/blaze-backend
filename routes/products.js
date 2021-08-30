const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/add', productsController.add);
router.get('/get', productsController.get);

module.exports = router;