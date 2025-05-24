// Announcement - Get Route
exports.getAnnouncement = (req, res) => {
  res.render("admin/announcement", {
    admin: req.session.admin ?? "Admin",
    title: "Add Announcement",
  });
};

// Announcement = Post Route
exports.postAnnouncement = (req, res) => {
  res.redirect(303, "/manage-announcement")
}


// Manage Announcement = Get Route
exports.getManageAnnouncement = (req, res) => {
  res.render("admin/announcementDetails", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Announcement",
  })
}
