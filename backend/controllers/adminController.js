const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (name, email, password, address, role)
      VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, address, role],
    );

    res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    await db.query(
      `INSERT INTO stores
      (name, email, address, owner_id)
      VALUES (?, ?, ?, ?)`,
      [name, email, address, owner_id],
    );

    res.status(201).json({
      message: "Store added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");

    const [stores] = await db.query(
      "SELECT COUNT(*) AS totalStores FROM stores",
    );

    const [ratings] = await db.query(
      "SELECT COUNT(*) AS totalRatings FROM ratings",
    );

    res.status(200).json({
      totalUsers: users[0].totalUsers,
      totalStores: stores[0].totalStores,
      totalRatings: ratings[0].totalRatings,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
