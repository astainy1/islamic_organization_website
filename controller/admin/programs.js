const path = require("path");
const fs = require("fs");
const programModel = require("../../models/programModel");
const db = require("../../config/db");

// Add Program = Get Route
exports.getAddProgram = (req, res) => {
  res.render("admin/addProgram", {
    admin: req.session.admin ?? "Admin",
    title: "Add Program ",
  });
};

// Add Program = Post Route
exports.postAddProgram = (req, res) => {
  // After successful action
  req.session.flashMessage = "Program created successfully!";
  req.session.flashType = "success";

  const {
    title,
    summary,
    description,
    target_audience,
    location,
    frequency,
    duration,
    video_url,
    testimonial,
    testimonial_by,
  } = req.body;

  console.log(title, summary);
  const hero_image = req.files?.hero_image?.[0]?.filename || "";
  const cover_image = req.files?.cover_image?.[0]?.filename || "";
  const pdf_path = req.files?.pdf?.[0]?.filename || "";
  const gallery_images = req.files?.gallery?.map((f) => f.filename) || [];

  const programData = {
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
  };

  programModel.createProgram(programData, (err, result) => {
    if (err) return res.status(500).send("Database error: " + err.message);

    const programId = result.insertId;
    if (gallery_images.length > 0) {
      programModel.addGalleryImages(programId, gallery_images, (err) => {
        if (err) console.error("Gallery insert error:", err);
      });
    }

    res.redirect("/admin/manage-program");
  });
};

// Manage Program = Get Route
exports.getManageProgram = (req, res) => {
  const message = req.session.flashMessage;
  const type = req.session.flashType;
  delete req.session.flashMessage;
  delete req.session.flashType;

  const query = req.query.q ? req.query.q.trim() : '';
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  // Count total programs filtered by search query
  const countSql = query
    ? "SELECT COUNT(*) AS count FROM programs WHERE title LIKE ?"
    : "SELECT COUNT(*) AS count FROM programs";

  const countParams = query ? [`%${query}%`] : [];

  db.query(countSql, countParams, (err, countResult) => {
    if (err) {
      console.error("Error fetching program count:", err);
      return res.status(500).send("Server error");
    }

    const totalPrograms = countResult[0].count;
    const totalPages = Math.ceil(totalPrograms / limit);

    // Fetch paginated programs with search filter if applicable
    const selectSql = query
      ? "SELECT * FROM programs WHERE title LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
      : "SELECT * FROM programs ORDER BY created_at DESC LIMIT ? OFFSET ?";

    const selectParams = query ? [`%${query}%`, limit, offset] : [limit, offset];

    db.query(selectSql, selectParams, (err, programs) => {
      if (err) {
        console.error("Error fetching programs:", err);
        return res.status(500).send("Server error");
      }

      res.render("admin/manageProgram", {
        programs,
        title: "Manage Program",
        admin: req.session.admin ?? "Admin",
        message,
        type,
        page,
        totalPages,
        query,  // pass the search query to keep the input filled
      });
    });
  });
};

// Delete Program
exports.deleteProgram = (req, res) => {
  // After successful action
  req.session.flashMessage = "Program Deleted successfully!";
  req.session.flashType = "success";

  const id = req.params.id;
  programModel.deleteProgramById(id, (err, result) => {
    if (err) return res.status(500).send("Error deleting program");
    res.redirect("/admin/manage-program");
  });
};

// GET - Edit Form
exports.getEditProgram = (req, res) => {
  // On rendering view
  const message = req.session.flashMessage;
  const type = req.session.flashType;
  delete req.session.flashMessage;
  delete req.session.flashType;
  const id = req.params.id;
  programModel.getProgramById(id, (err, program) => {
    if (err || !program) return res.status(404).send("Program not found");
    res.render("admin/editprogram", {
      program,
      title: "Edit Program ",
      admin: req.session.admin ?? "Admin",
      message,
       type,
    });
  });
};

// POST - Save Edit
exports.postEditProgram = (req, res) => {
  // After successful action
  req.session.flashMessage = "Program created successfully!";
  req.session.flashType = "success";

  const id = req.params.id;
  const {
    title,
    summary,
    description,
    target_audience,
    location,
    frequency,
    duration,
    video_url,
    testimonial,
    testimonial_by,
  } = req.body;

  const updateData = {
    title,
    summary,
    description,
    target_audience,
    location,
    frequency,
    duration,
    video_url,
    testimonial,
    testimonial_by,
  };

  programModel.updateProgram(id, updateData, (err) => {
    if (err) return res.status(500).send("Failed to update program");
    res.redirect("/admin/manage-program");
  });
};

// View Program
exports.viewProgram = (req, res) => {
  // On rendering view
  const message = req.session.flashMessage;
  const type = req.session.flashType;
  delete req.session.flashMessage;
  delete req.session.flashType;
  // clear flash message after one-time use
  req.session.flashMessage = null;
  req.session.flashType = null;

  const id = req.params.id;
  programModel.getProgramById(id, (err, program) => {
    if (err || !program) return res.status(404).send("Program not found");
    res.render("admin/viewProgram", {
      program,
      title: "View Program ",
      admin: req.session.admin ?? "Admin",
      message,
      type,
    });
  });
};


