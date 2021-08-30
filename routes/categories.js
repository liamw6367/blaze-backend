const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.post('/add', categoriesController.add);
router.get('/get', categoriesController.get);

module.exports = router;