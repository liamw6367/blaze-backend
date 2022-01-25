const express = require('express');
const router = express.Router();
const chatController = require('../controllers/supportChatController');
// const u = require('../config/multer');

router.post('/save-message', chatController.saveMessages);
// router.put('/update', bannersController.update);
router.get('/get-messages', chatController.getMessages);
// router.get('/get-one', bannersController.getOne);
// router.delete('/remove', bannersController.remove);

module.exports = router;