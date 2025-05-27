const testimonyModel = require("../../models/testimonialModel");
const path = require("path");
const fs = require("fs");

// Add Testimonial - Get Route
exports.getAddTestimonial = (req, res) => {
  res.render("admin/addTestimonial", {
    admin: req.session.admin ?? "Admin",
    title: "Add Testimonial ",
  });
};



// POST: Handle Testimony Submission
exports.postAddTestimonial = (req, res) => {
  const { name, position, message, status } = req.body;

  const photo = req.file ? req.file.filename : null;

  console.log(name, position, message, photo);
  if (!photo) {
    req.flash("error", "Photo is required.");
    return res.redirect("/admin/add-testimonial");
  }

  const newTestimony = { name, position, message, photo, status };

  testimonyModel.addTestimony(newTestimony, (err) => {
    if (err) {
      console.error("DB Insert Error:", err);
      req.flash("error", "Failed to add testimony.");
      return res.redirect("/admin/add-testimonial");
    }

    req.flash("success", "Testimony added successfully.");
    res.redirect("/admin/manage-testimonials");
  });
};

// GET: Manage Testimonies Page

exports.getManageTestimonial = (req, res) => {
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  testimonyModel.getPaginatedTestimonies(search, limit, offset, (err, testimonies) => {
    if (err) return res.status(500).send("Error loading data");

    testimonyModel.countTestimonies(search, (err, total) => {
      if (err) return res.status(500).send("Error counting");

      const totalPages = Math.ceil(total / limit);

      res.render("admin/manageTestimonial", {
        title: "Manage Testimonies",
        admin: req.session.admin ?? "Admin",
        testimonies,
        currentPage: page,
        totalPages,
        search
      });
    });
  });
};

// DELETE
exports.deleteTestimonial = (req, res) => {
  const id = req.params.id;
  testimonyModel.deleteTestimony(id, (err) => {
    if (err) req.flash("error", "Failed to delete testimony.");
    else req.flash("success", "Testimony deleted.");
    res.redirect("/admin/manage-testimonials");
  });
};

// UPDATE STATUS
exports.toggleStatus = (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  testimonyModel.updateStatus(id, newStatus, (err) => {
    if (err) req.flash("error", "Failed to update status.");
    else req.flash("success", "Status updated.");
    res.redirect("/admin/manage-testimonials");
  });
};

// GET: Edit Form
exports.getEditTestimonial = (req, res) => {
  const id = req.params.id;
  testimonyModel.getTestimonyById(id, (err, testimony) => {
    if (err || !testimony) {
      console.error("Testimony not found", err.stack)
      req.flash("error", "Testimony not found.");
      return res.redirect("/admin/manage-testimonials");
    }

    res.render("admin/editTestimonial", {
      title: "Edit Testimony",
      admin: req.session.admin ?? "Admin",
      testimony
    });
  });
};

// POST: Edit Handler
exports.postEditTestimonial = (req, res) => {
  const id = req.params.id;
  const { name, position, message, status } = req.body;
  let photo = req.body.oldPhoto;

  if (req.file) {
    photo = req.file.filename;

    // Delete old photo
    const oldPath = path.join("uploads/testimonials", req.body.oldPhoto);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  const updatedTestimony = { name, position, message, status, photo };

  testimonyModel.updateTestimony(id, updatedTestimony, (err) => {
    if (err) {
      console.error("Update error:", err);
      req.flash("error", "Failed to update testimony.");
      return res.redirect("/admin/manage-testimonials");
    }

    req.flash("success", "Testimony updated successfully.");
    res.redirect("/admin/manage-testimonials");
  });
};