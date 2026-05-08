const express = require("express");

const router = express.Router();

const { getOwnerDashboard } = require("../controllers/ownerController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  allowRoles("STORE_OWNER"),
  getOwnerDashboard,
);

module.exports = router;
