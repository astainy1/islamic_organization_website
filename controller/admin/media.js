// Add Media - Get Route
exports.getAddMedia = (req, res) => {
  res.render("admin/addMedia", {
    admin: req.session.admin ?? "Admin",
    title: "Add Media",
  });
};

// Add Media - Post Route
exports.postAddMedia = (req, res) => {
  res.redirect(303, "/admin/add-media");
};

// Manage Media - Get Route
exports.getManageMedia = (req, res) => {
  res.render("admin/manageMedia", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Media ",
  });
};

// Manage Media - Post Route
exports.postManageMedia = (req, res) => {
  res.redirect(303, "/admin/manage-media");
};
