const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/get-roles', usersController.getRoles);
router.get('/get-users-by-role', usersController.getUsersByRole);


module.exports = router;