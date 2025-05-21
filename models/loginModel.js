const db = require("../config/db");

exports.findAdminCredentials = (username, callback) => {
  const dbQuery = "SELECT * FROM admins WHERE username = ?";
  db.query(dbQuery, [username], callback);
};
