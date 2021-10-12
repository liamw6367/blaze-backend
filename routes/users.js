const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/get-roles', usersController.getRoles);


module.exports = router;