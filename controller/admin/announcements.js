const announcementModel = require("../../models/announcementModel");
const model = require("../../models/announcementModel");

// Announcement - Get Route
exports.getAddAnnouncement = (req, res) => {
  res.render("admin/addAnnouncement", {
    admin: req.session.admin ?? "Admin",
    title: "Add Announcement",
  });
};

// Announcement = Post Route
exports.postAddAnnouncement = (req, res) => {
  const {
    title,
    summary,
    content,
    location,
    event_date,
    event_time,
    cta_text,
    cta_link,
  } = req.body;
  const post_date = req.body.post_date || new Date().toISOString().split('T')[0];


  console.log("Body:", req.body);
  if (!title || !summary || !content || !location || !event_date || !event_time) {
  return res.status(400).send("All required fields must be filled.");
}

  const announcementData = {
    title,
    summary,
    content,
    location,
    event_date,
    event_time,
    post_date,
    cta_text,
    cta_link,
  };

  announcementModel.insertAnnouncement(announcementData, (err, result) => {
    if (err) {
      console.error("Error saving announcement:", err);
      return res.status(500).send("Server error");
    }
    req.flash("success", "Announcement added successfully.");
    res.redirect(303, "/admin/manage-announcements");
  });
};


// Manage Announcement = Get Route
exports.getManageAnnouncement = (req, res) => {
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  model.countAnnouncements(search, (err, total) => {
    if (err) return res.status(500).send("Error counting announcements");

    const totalPages = Math.ceil(total / limit);

    model.getAnnouncements(search, limit, offset, (err, announcements) => {
      if (err) return res.status(500).send("Error fetching announcements");

     res.render("admin/manageAnnouncement", {
  title: "Manage Announcements",
  announcements,
  currentPage: page,
  totalPages,
  search,
  admin: req.session.admin ?? "Admin",
  pageSize: limit,     
  message: '',
});
    });
  });
};

// Toggle post status
exports.togglePostStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  model.togglePostStatus(id, status, (err) => {
    if (err) return res.status(500).json({ error: `Update failed! ${err.message}` });
    res.json({ success: true });
  });
};

// GET: Edit Form
exports.getEditAnnouncement = (req, res) => {
  const id = req.params.id;

  announcementModel.getAnnouncementById(id, (err, announcement) => {
    if (err || !announcement) {
      req.flash("error", "Announcement not found.");
      return res.redirect("/admin/manage-announcements");
    }

    res.render("admin/editAnnouncement", {
      announcement,
      title: "Edit Announcement",
      admin: req.session.admin ?? "Admin",
    });
  });
};

// POST: Update Handler
exports.postEditAnnouncement = (req, res) => {
  const id = req.params.id;
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
  } = req.body;

  const updatedData = {
    title,
    summary,
    content,
    location,
    event_date,
    event_time,
    post_date,
    cta_text,
    cta_link
  };

  announcementModel.updateAnnouncement(id, updatedData, (err) => {
    if (err) {
      console.error("Update Error:", err);
      req.flash("error", "Failed to update announcement.");
      return res.redirect("/admin/manage-announcements");
    }

    req.flash("success", "Announcement updated successfully.");
    res.redirect("/admin/manage-announcements");
  });
};


// View Announcement - GET
exports.getViewAnnouncement = (req, res) => {
  const announcementId = req.params.id;

  announcementModel.getAnnouncementById(announcementId, (err, announcement) => {
    if (err) {
      console.error("Error fetching announcement:", err);
      return res.status(500).send("Server error");
    }
    if (!announcement) {
      return res.status(404).send("Announcement not found");
    }

    res.render("admin/viewAnnouncement", {
      title: "View Announcement",
      admin: req.session.admin ?? "Admin",
      announcement,
    });
  });
};


// Delete Announcement
exports.postDeleteAnnouncement = (req, res) => {
  const id = req.params.id;

  announcementModel.deleteAnnouncement(id, (err) => {
    if (err) {
      console.error("Error deleting announcement:", err);
      return res.status(500).send("Failed to delete announcement.");
    }

    req.flash("success", "Announcement deleted successfully.");
    res.redirect("/admin/manage-announcements");
  });
};
