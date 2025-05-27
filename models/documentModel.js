const db = require("../config/db");

exports.insertDocument = (data, callback) => {
  const { title, display_info, category, file_path } = data;
  const sql = `INSERT INTO documents (title, display_info, category, file_path) VALUES (?, ?, ?, ?)`;
  db.query(sql, [title, display_info, category, file_path], callback);
};


exports.getFilteredDocuments = (search, category, limit, offset, callback) => {
  const query = `
    SELECT * FROM documents 
    WHERE title LIKE ? AND category LIKE ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  const values = [`%${search}%`, `%${category}%`, limit, offset];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    db.query(
      `SELECT COUNT(*) AS total FROM documents WHERE title LIKE ? AND category LIKE ?`,
      [`%${search}%`, `%${category}%`],
      (err, countResult) => {
        if (err) return callback(err);
        callback(null, results, countResult[0].total);
      }
    );
  });
};

exports.deleteDocumentById = (id, callback) => {
  db.query("DELETE FROM documents WHERE id = ?", [id], callback);
};
