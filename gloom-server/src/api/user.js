const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { verifyAccessToken } = require("../middleware/auth");

router.post("/addUser", userController.createUser);
router.post("/login", userController.signIn)
router.get("/user/",verifyAccessToken,userController.getAllUser)
router.get("/user/who/:id",verifyAccessToken,userController.getUserById)
router.get("/user/me",verifyAccessToken,userController.authMe)

module.exports = router;
