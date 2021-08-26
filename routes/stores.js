const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/add', storeController.add);
router.get('/get', storeController.get);

module.exports = router;