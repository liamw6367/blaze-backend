const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const u = require('../config/multer');

router.post('/add', u.uploadImage, productsController.add);
router.get('/get', productsController.get);

module.exports = router;