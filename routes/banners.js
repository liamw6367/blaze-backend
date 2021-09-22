const express = require('express');
const router = express.Router();
const bannersController = require('../controllers/bannersController');
const u = require('../config/multer');

router.post('/add', u.uploadBanner, bannersController.add);
router.put('/update', bannersController.update);
router.get('/get', bannersController.get);
router.get('/get-one', bannersController.getOne);
router.delete('/remove', bannersController.remove);

module.exports = router;