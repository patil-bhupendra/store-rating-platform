const express = require("express");

const router = express.Router();

const {
  getAllStores,
  submitRating,
} = require("../controllers/storeController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getAllStores);

router.post("/rate", verifyToken, allowRoles("USER"), submitRating);

module.exports = router;
