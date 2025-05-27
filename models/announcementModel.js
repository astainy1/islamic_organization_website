const db = require("../config/db");

// Insert new announcement
exports.insertAnnouncement = (data, callback) => {
  const {
    title,
    summary,
    content,
    location,
    event_date,
    event_time,
    cta_text,
    cta_link,
  } = data;

  const sql = `
    INSERT INTO announcements 
    (title, summary, content, location, event_date, event_time, cta_text, cta_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      summary,
      content,
      location,
      event_date,
      event_time,
      cta_text,
      cta_link,
    ],
    callback
  );
};


// Fetch announcements with pagination and search
exports.getAnnouncements = (search, limit, offset, callback) => {
  const query = `
    SELECT * FROM announcements
    WHERE title LIKE ? OR summary LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?`;
  const searchTerm = `%${search}%`;
  db.query(query, [searchTerm, searchTerm, limit, offset], callback);
};

// Count total announcements
exports.countAnnouncements = (search, callback) => {
  const query = `SELECT COUNT(*) AS total FROM announcements WHERE title LIKE ? OR summary LIKE ?`;
  const searchTerm = `%${search}%`;
  db.query(query, [searchTerm, searchTerm], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0].total);
  });
};

// Toggle post status (simulate publish/unpublish)
exports.togglePostStatus = (id, postStatus, callback) => {
 const query = "UPDATE announcements SET status = ? WHERE id = ?";
;
  db.query(query, [postStatus, id], callback);
};

// Get one announcement
exports.getAnnouncementById = (id, callback) => {
  const sql = "SELECT * FROM announcements WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    return callback(null, results[0]);
  });
};

// Update announcement
exports.updateAnnouncement = (id, data, callback) => {
  const {
    title,
    summary,
    content,
    location,
    event_date,
    event_time,
    post_date,
    cta_text,
    cta_link
  } = data;

  const sql = `
    UPDATE announcements 
    SET title = ?, summary = ?, content = ?, location = ?, 
        event_date = ?, event_time = ?, post_date = ?, 
        cta_text = ?, cta_link = ?
    WHERE id = ?
  `;

  db.query(sql, [
    title, summary, content, location, event_date, event_time,
    post_date, cta_text, cta_link, id
  ], callback);
};


// Get announcement by ID
exports.getAnnouncementById = (id, callback) => {
  const sql = `SELECT * FROM announcements WHERE id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Delete announcement by ID
exports.deleteAnnouncement = (id, callback) => {
  const sql = `DELETE FROM announcements WHERE id = ?`;
  db.query(sql, [id], callback);
};
