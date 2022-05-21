const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller');


router.get('/:id', userController.getUserById);



module.exports = router;