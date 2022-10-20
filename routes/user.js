//// IMPORT ////
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");
const controleEmail = require("../middleware/controleEmail");

//// ROUTES ////
router.post("/signup", password, controleEmail, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
