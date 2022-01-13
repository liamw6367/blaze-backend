const express = require('express');
const router = express.Router();
const deliveryFeeController = require('../controllers/deliveryFeeController');
const m = require('../config/multer');
const validateUser = require('../validators/validateUser');


router.get('/get', deliveryFeeController.get);
router.put('/update', deliveryFeeController.update);


module.exports = router;