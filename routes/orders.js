const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const u = require('../config/multer');

router.post('/add', ordersController.add);
// router.put('/update', ordersController.update);
router.get('/get', ordersController.get);
// router.get('/get-one', ordersController.getOne);
// router.delete('/remove', ordersController.remove);

module.exports = router;