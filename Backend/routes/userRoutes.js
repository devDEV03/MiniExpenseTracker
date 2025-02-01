const express = require("express");
const { loginUser, registerUser, getAccessTokenUsingRefreshToken } = require("../controller/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.post("/refresh-token",getAccessTokenUsingRefreshToken);

module.exports = router;