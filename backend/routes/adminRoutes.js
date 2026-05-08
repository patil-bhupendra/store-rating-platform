const express = require("express");

const router = express.Router();

const {
  addUser,
  addStore,
  getDashboardStats,
} = require("../controllers/adminController");

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

const { getUsers, getStores } = require("../controllers/adminController");

router.post("/add-user", verifyToken, allowRoles("ADMIN"), addUser);

router.post("/add-store", verifyToken, allowRoles("ADMIN"), addStore);

router.get("/dashboard", verifyToken, allowRoles("ADMIN"), getDashboardStats);

router.get("/users", verifyToken, allowRoles("ADMIN"), getUsers);

router.get("/stores", verifyToken, allowRoles("ADMIN"), getStores);

module.exports = router;
