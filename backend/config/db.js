const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bhupendra@12345#",
  database: "store_rating_app",
});

module.exports = db.promise();