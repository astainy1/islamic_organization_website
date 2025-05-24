const db = require("../config/db");

// Create Program
exports.createProgram = (data, callback) => {
  const {
    title,
    summary,
    description,
    target_audience,
    location,
    frequency,
    duration,
    pdf_path,
    hero_image,
    cover_image,
    video_url,
    testimonial,
    testimonial_by,
  } = data;

  const sql = `
    INSERT INTO programs (
      title, summary, description, target_audience,
      location, frequency, duration, pdf_path,
      hero_image, cover_image, video_url, testimonial, testimonial_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      summary,
      description,
      target_audience,
      location,
      frequency,
      duration,
      pdf_path,
      hero_image,
      cover_image,
      video_url,
      testimonial,
      testimonial_by,
    ],
    callback
  );
};

// Program Gallery
exports.addGalleryImages = (programId, images, callback) => {
  const values = images.map((img) => [programId, img]);
  const sql = "INSERT INTO program_gallery (program_id, image_path) VALUES ?";
  db.query(sql, [values], callback);
};

// Delete Program
exports.deleteProgramById = (id, callback) => {
  const sql = "DELETE FROM programs WHERE id = ?";
  db.query(sql, [id], callback);
};

// Edit Program
exports.updateProgram = (id, updatedData, callback) => {
  const sql = `UPDATE programs SET ? WHERE id = ?`;
  db.query(sql, [updatedData, id], callback);
};

// View Program
exports.getProgramById = (id, callback) => {
  const sql = "SELECT * FROM programs WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

