// Add Class - Get Route
exports.getAddClass = (req, res) => {
  res.render("admin/addclass", {
    admin: req.session.admin ?? "Admin",
    title: "Add Class | Salem Bakhit High School",
  });
};

// Add Class - Post Route
exports.postAddClass = (req, res) => {
  res.redirect(303, "/admin/add-class");
};

// Manage Class - Get Route
exports.getManageClass = (req, res) => {
  res.render("admin/manageclass", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Class | Salem Bakhit High School",
  });
};

// Manage Class - Post Route
exports.postManageClass = (req, res) => {
  res.redirect(303, "/admin/manage-class");
};
