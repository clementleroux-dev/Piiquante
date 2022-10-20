//// IMPORT ////
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

//// ROUTES ////
router.post("/", auth, multer, saucesCtrl.createSauces);
router.get("/:id", auth, saucesCtrl.getSauces);
router.get("/", auth, saucesCtrl.getAllSauces);
router.put("/:id", auth, multer, saucesCtrl.modifySauces);
router.delete("/:id", auth, multer, saucesCtrl.deleteSauces);
router.post("/:id/like", auth, saucesCtrl.likeSauces);

module.exports = router;
