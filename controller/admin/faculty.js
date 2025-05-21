// Add Faculty - Get Route
exports.getFaculty = (req, res) => {
  res.render("admin/addfaculty", {
    admin: req.session.admin ?? "Admin",
    title: "Add Faculty | Salem Bakhit High School",
  });
};

// Add Faculty - Post Route
exports.postFaculty = (req, res) => {
  res.redirect("/admin/add-faculty");
};

// Manage Faculty - Get Route
exports.getManageFaculty = (req, res) => {
  res.render("admin/managefaculty", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Faculty | Salem Bakhit High School",
  });
};

// Manage Faculty - Post Route
exports.postManageFaculty = (req, res) => {
  res.redirect(303, "/admin/manage-faculty");
};
