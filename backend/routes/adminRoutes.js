const express = require("express");

const router = express.Router();

const {
  addUser,
  addStore,
  getDashboardStats,
} = require("../controllers/adminController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.post("/add-user", verifyToken, allowRoles("ADMIN"), addUser);

router.post("/add-store", verifyToken, allowRoles("ADMIN"), addStore);

router.get("/dashboard", verifyToken, allowRoles("ADMIN"), getDashboardStats);

module.exports = router;
