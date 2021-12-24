const express = require('express');
const router = express.Router();
const chatController = require('../controllers/supportChatController');
// const u = require('../config/multer');

// router.post('/add', u.uploadBanner, bannersController.add);
// router.put('/update', bannersController.update);
router.get('/get-messages', chatController.getMessages);
// router.get('/get-one', bannersController.getOne);
// router.delete('/remove', bannersController.remove);

module.exports = router;