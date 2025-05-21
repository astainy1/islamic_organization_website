// Add Gallery - Get Route
exports.getAddGallery = (req, res) => {
  res.render("admin/addgallery", {
    admin: req.session.admin ?? "Admin",
    title: "Add Gallery | Salem Bakhit High School",
  });
};

// Add Gallery - Post Route
exports.postAddGallery = (req, res) => {
  res.redirect(303, "/admin/add-gallery");
};

// Manage Gallery - Get Route
exports.getManageGallery = (req, res) => {
  res.render("admin/managegallery", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Gallery | Salem Bakhit High School",
  });
};

// Manage Gallery - Post Route
exports.postManageGallery = (req, res) => {
  res.redirect(303, "/admin/manage-gallery");
};
