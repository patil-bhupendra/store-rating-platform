const db = require("../config/db");

exports.getAllStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const [stores] = await db.query(
      `
      SELECT
        stores.id,
        stores.name,
        stores.address,

        ROUND(AVG(ratings.rating), 1) AS overall_rating,

        (
          SELECT rating
          FROM ratings
          WHERE ratings.store_id = stores.id
          AND ratings.user_id = ?
        ) AS user_rating

      FROM stores

      LEFT JOIN ratings
      ON stores.id = ratings.store_id

      GROUP BY stores.id
    `,
      [userId],
    );

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.submitRating = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      store_id,
      rating,
    } = req.body;

    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    
    const [existingRating] = await db.query(
      `SELECT * FROM ratings
       WHERE user_id = ? AND store_id = ?`,
      [userId, store_id]
    );

    
    if (existingRating.length > 0) {

      await db.query(
        `UPDATE ratings
         SET rating = ?
         WHERE user_id = ? AND store_id = ?`,
        [rating, userId, store_id]
      );

      return res.status(200).json({
        message: "Rating updated successfully",
      });
    }

   
    await db.query(
      `INSERT INTO ratings
       (user_id, store_id, rating)
       VALUES (?, ?, ?)`,
      [userId, store_id, rating]
    );

    res.status(201).json({
      message: "Rating submitted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};