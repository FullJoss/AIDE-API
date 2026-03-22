const express = require("express");
const router = express.Router();
const progController = require("../controllers/programmeController");

router.get("/load", progController.postLoad);
router.get("/new", progController.postCreate);
module.exports = router;
