const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.Controller');

router.get('/', categoryController.getCategory);


module.exports = router;