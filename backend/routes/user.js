//// IMPORT ////
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const password = require("../middleware/password");
const controleEmail = require("../middleware/controleEmail");
const rateLimit = require("express-rate-limit");

// Limit number of request for signup route
const AccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

//// ROUTES ////
router.post(
  "/signup",
  AccountLimiter,
  password,
  controleEmail,
  userCtrl.signup
);
router.post("/login", userCtrl.login);

module.exports = router;
