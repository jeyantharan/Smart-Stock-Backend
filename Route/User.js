const express = require('express');
const router = express.Router();

const UserController = require("../Controller/User");
const { authMiddleware, adminMiddleware } = require('../Middleware/Auth');



//Register a new user
router.post("/register",UserController.User_Register);

// Login user
router.post("/login",UserController.User_Login);

//User Info
router.get("/userInfo",authMiddleware,UserController.User_Info);

// Update user profile
router.put('/profile', authMiddleware,UserController.UpdateUserProfile);



module.exports = router;
