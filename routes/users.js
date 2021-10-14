const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const m = require('../config/multer');


router.get('/get-roles', usersController.getRoles);
router.get('/get-users-by-role', usersController.getUsersByRole);
router.put('/update-profile', m.uploadAvatar, usersController.updateProfile);
router.put('/update-driver-details', usersController.updateDriverDetails);


module.exports = router;