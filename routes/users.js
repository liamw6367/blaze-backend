const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const m = require('../config/multer');
const validateUser = require('../validators/validateUser');


router.get('/get-roles', usersController.getRoles);
router.get('/get-users-by-role', usersController.getUsersByRole);
router.put('/update-profile', validateUser.rules, m.uploadAvatar, usersController.updateProfile);
router.put('/update-driver-details', usersController.updateDriverDetails);
router.put('/verify-phone', usersController.verifyPhone);
router.put('/activate-profile', usersController.activateProfile);
router.put('/save-delivery-details', usersController.saveDeliveryDetails);


module.exports = router;