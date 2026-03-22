const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.newPatient);
router.get("/", patientController.getAllPatient);

module.exports = router;
