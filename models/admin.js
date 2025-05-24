const db = require("../config/db");

/**
 * Update admin profile
 * @param {Object} data - Profile details
 * @param {number} data.id - Admin user ID
 * @param {string} data.name - Full name
 * @param {string} data.username - Username
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number
 * @param {string} data.password - Hashed password
 * @param {string} data.profileImage - Profile image filename
 * @param {Function} callback - Callback function
 */
exports.updateProfile = (data, callback) => {
  const sql = `
    UPDATE admins 
    SET 
      name = ?, 
      username = ?, 
      email = ?, 
      phone = ?, 
      password = ?, 
      profile_picture = ?
    WHERE id = ?
  `;

  const values = [
    data.name,
    data.username,
    data.email,
    data.phone,
    data.password,
    data.profileImage,
    data.id
  ];

  db.query(sql, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
