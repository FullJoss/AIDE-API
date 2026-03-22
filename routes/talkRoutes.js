const express = require("express");
const router = express.Router();
const controller = require("../controllers/talkController");

router.get("/", controller.getTalk);

module.exports = router;
