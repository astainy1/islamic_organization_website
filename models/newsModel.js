const db = require("../config/db");

exports.insertNews = (newsData, callback) => {
  const {
    title,
    slug,
    summary,
    content,
    author,
    category,
    cover_image,
    gallery,
    tags,
    post_date
  } = newsData;

  const sql = `
    INSERT INTO news (title, slug, summary, content, author, category, cover_image, gallery, tags, post_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    title,
    slug,
    summary,
    content,
    author,
    category,
    cover_image,
    JSON.stringify(gallery),
    JSON.stringify(tags),
    post_date
  ], callback);
};

// Get total count + paginated news
exports.getNews = (search, category, limit, offset, callback) => {
  const countSql = `SELECT COUNT(*) AS count FROM news WHERE title LIKE ? AND category LIKE ?`;
  const dataSql = `SELECT * FROM news WHERE title LIKE ? AND category LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;

  db.query(countSql, [`%${search}%`, `%${category}%`], (err, countResult) => {
    if (err) return callback(err);

    const total = countResult[0].count;

    db.query(
      dataSql,
      [`%${search}%`, `%${category}%`, parseInt(limit), parseInt(offset)],
      (err, dataResult) => {
        if (err) return callback(err);

        callback(null, { news: dataResult, total });
      }
    );
  });
};

// Get single news
exports.getNewsById = (id, callback) => {
  db.query(`SELECT * FROM news WHERE id = ?`, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

// Update News
exports.updateNews = (data, callback) => {
  const {
    id, title, slug, summary, content,
    author, category, cover_image,
    gallery, tags, post_date
  } = data;

  const sql = `
    UPDATE news 
    SET title = ?, slug = ?, summary = ?, content = ?, 
        author = ?, category = ?, cover_image = ?, 
        gallery = ?, tags = ?, post_date = ?
    WHERE id = ?
  `;

  db.query(sql, [
    title, slug, summary, content,
    author, category, cover_image,
    JSON.stringify(gallery), JSON.stringify(tags),
    post_date, id
  ], callback);
};


// Delete news
exports.deleteNews = (id, callback) => {
  db.query(`DELETE FROM news WHERE id = ?`, [id], callback);
};
