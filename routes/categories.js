const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.post('/add', categoriesController.add);
router.get('/get', categoriesController.get);
router.get('/get-one', categoriesController.getOne);
router.put('/update', categoriesController.update);
router.delete('/remove', categoriesController.remove);

module.exports = router;