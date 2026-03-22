const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/moi", userController.getAllUsers);

module.exports = router;
