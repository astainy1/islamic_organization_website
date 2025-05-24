// Add Document - Get Route
exports.getAddDocument = (req, res) => {
  res.render("admin/addDocument", {
    admin: req.session.admin ?? "Admin",
    title: "Add Document",
  });
};

// Add Document - Post Route
exports.postAddDocument = (req, res) => {
  res.redirect(303, "/admin/add-document");
};

// Manage Class - Get Route
exports.getManageDocument = (req, res) => {
  res.render("admin/manageDocument", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Class",
  });
};

// Manage Class - Post Route
exports.postManageDocument = (req, res) => {
  res.redirect(303, "/admin/manage-document");
};
