const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.post("/add-user" ,userController.addUser);
router.post("/login-user", userController.loginUsers);

module.exports = router