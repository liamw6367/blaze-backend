const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const u = require('../config/multer');

router.post('/add', ordersController.add);
router.put('/check-out', ordersController.checkOutOrder);
router.get('/get', ordersController.get);
// router.get('/get-one', ordersController.getOne);
router.delete('/cancel', ordersController.cancelOrder);

module.exports = router;