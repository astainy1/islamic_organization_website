const db = require("../config/db");


// Add Project
exports.createProject = (data, gallery, callback) => {
  const {
    title, summary, description, date,
    location, ongoing, cover_image
  } = data;

  const sql = `INSERT INTO projects (title, summary, description, date, location, ongoing, cover_image)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, summary, description, date, location, ongoing, cover_image], (err, result) => {
    if (err) return callback(err);

    const projectId = result.insertId;

    if (gallery && gallery.length > 0) {
      const gallerySQL = `INSERT INTO project_gallery (project_id, image_path) VALUES ?`;
      const values = gallery.map(img => [projectId, img]);

      db.query(gallerySQL, [values], callback);
    } else {
      callback(null, result);
    }
  });
};


// Manage Project: Fetch All Projects
exports.getProjectsPaginated = (search, limit, offset, callback) => {
  const searchQuery = `%${search}%`;
  const sql = `
    SELECT * FROM projects
    WHERE title LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?`;

  const countSql = `SELECT COUNT(*) as total FROM projects WHERE title LIKE ?`;

  db.query(countSql, [searchQuery], (err, countResult) => {
    if (err) return callback(err);

    const total = countResult[0].total;

    db.query(sql, [searchQuery, limit, offset], (err, result) => {
      if (err) return callback(err);
      callback(null, result, total);
    });
  });
};

// Get file assets for a project (cover + gallery)
exports.getProjectAssets = (projectId, callback) => {
  const query = `
    SELECT 
      cover_image,
      (SELECT GROUP_CONCAT(image_path) FROM project_gallery WHERE project_id = ?) AS gallery
    FROM projects
    WHERE id = ?`;

  db.query(query, [projectId, projectId], (err, results) => {
    if (err || results.length === 0) return callback(err || null);

    const galleryArray = results[0].gallery
      ? results[0].gallery.split(",")
      : [];

    callback(null, {
      cover_image: results[0].cover_image,
      gallery: galleryArray
    });
  });
};

// Delete project and its gallery
exports.deleteProjectById = (projectId, callback) => {
  const deleteGallery = `DELETE FROM project_gallery WHERE project_id = ?`;
  const deleteProject = `DELETE FROM projects WHERE id = ?`;

  db.query(deleteGallery, [projectId], (err) => {
    if (err) return callback(err);

    db.query(deleteProject, [projectId], callback);
  });
};

// Edit Project
exports.getProjectById = (id, callback) => {
  db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {
    callback(err, results[0]);
  });
};

exports.getProjectGallery = (projectId, callback) => {
  db.query("SELECT * FROM project_gallery WHERE project_id = ?", [projectId], callback);
};

exports.updateProject = (data, callback) => {
  const { id, title, summary, description, date, location, ongoing, cover_image } = data;

  const sql = `
    UPDATE projects
    SET title = ?, summary = ?, description = ?, date = ?, location = ?, ongoing = ?, cover_image = ?
    WHERE id = ?
  `;

  db.query(sql, [title, summary, description, date, location, ongoing, cover_image, id], callback);
};

exports.replaceGallery = (projectId, gallery, callback) => {
  db.query("DELETE FROM project_gallery WHERE project_id = ?", [projectId], (err) => {
    if (err) return callback(err);

    const values = gallery.map(img => [projectId, img]);
    db.query("INSERT INTO project_gallery (project_id, image_path) VALUES ?", [values], callback);
  });
};
