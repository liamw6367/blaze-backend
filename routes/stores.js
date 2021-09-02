const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/add', storeController.add);
router.put('/update', storeController.update);
router.get('/get', storeController.get);
router.get('/get/{id}', storeController.getOne);

module.exports = router;