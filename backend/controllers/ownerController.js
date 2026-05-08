const db = require("../config/db");

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [stores] = await db.query(
      `
      SELECT *
      FROM stores
      WHERE owner_id = ?
      `,
      [ownerId],
    );

    if (stores.length === 0) {
      return res.status(404).json({
        message: "No store found for this owner",
      });
    }

    const store = stores[0];

    const [avgRatingResult] = await db.query(
      `
      SELECT ROUND(AVG(rating), 1)
      AS average_rating

      FROM ratings

      WHERE store_id = ?
      `,
      [store.id],
    );

    const [ratedUsers] = await db.query(
      `
      SELECT
        users.id,
        users.name,
        users.email,
        ratings.rating

      FROM ratings

      JOIN users
      ON ratings.user_id = users.id

      WHERE ratings.store_id = ?
      `,
      [store.id],
    );

    res.status(200).json({
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
      },

      average_rating: avgRatingResult[0].average_rating,

      rated_users: ratedUsers,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
