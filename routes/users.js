const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const m = require('../config/multer');
const validateUser = require('../validators/validateUser');


router.get('/get-roles', usersController.getRoles);
router.get('/get-users-by-role', usersController.getUsersByRole);
router.put('/update-profile', validateUser.rules, m.uploadAvatar, usersController.updateProfile);
router.put('/update-driver-details', usersController.updateDriverDetails);
router.post('/verify-phone', usersController.verifyPhone);


module.exports = router;