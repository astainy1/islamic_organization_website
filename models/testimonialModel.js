const db = require("../config/db");

exports.addTestimony = (data, callback) => {
  const { name, position, message, photo, status } = data;
  const sql = `
    INSERT INTO testimonials (name, position, message, status, photo)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, position, message, status, photo], callback);
};


// Fetch all testimonies - Manage Testimonials
exports.getAllTestimonies = (callback) => {
  const sql = `SELECT * FROM testimonials ORDER BY created_at DESC`;
  db.query(sql, callback);
};


// Get paginated + searchable testimonies
exports.getPaginatedTestimonies = (search, limit, offset, callback) => {
  const sql = `
    SELECT * FROM testimonials 
    WHERE name LIKE ? OR message LIKE ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  const term = `%${search}%`;
  db.query(sql, [term, term, limit, offset], callback);
};

// Count total matching records
exports.countTestimonies = (search, callback) => {
  const sql = `SELECT COUNT(*) AS count FROM testimonials WHERE name LIKE ? OR message LIKE ?`;
  const term = `%${search}%`;
  db.query(sql, [term, term], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count);
  });
};

// Delete
exports.deleteTestimony = (id, callback) => {
  const sql = `DELETE FROM testimonials WHERE id = ?`;
  db.query(sql, [id], callback);
};

// Change status
exports.updateStatus = (id, status, callback) => {
  const sql = `UPDATE testimonials SET status = ? WHERE id = ?`;
  db.query(sql, [status, id], callback);
};


// Get Testimony by ID
exports.getTestimonyById = (id, callback) => {
  db.query("SELECT * FROM testimonials WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Update Testimony
exports.updateTestimony = (id, data, callback) => {
  const { name, position, message, status, photo  } = data;
  const sql = `
    UPDATE testimonials 
    SET name = ?, position = ?, message = ?, status = ?, photo = ?
    WHERE id = ?
  `;
  db.query(sql, [name, position, message, status, photo, id], callback);
};
