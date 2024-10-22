const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.get('/getdetails',userController.getUserDetails)

module.exports = { userRouter };
