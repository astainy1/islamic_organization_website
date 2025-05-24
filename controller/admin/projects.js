// Add Project - Get Route
exports.getAddProject = (req, res) => {
  res.render("admin/addProject", {
    admin: req.session.admin ?? "Admin",
    title: "Add Project ",
  });
};

// Add Project - Post Route
exports.postAddProject = (req, res) => {
  res.redirect(303, "/admin/add-project");
};

// Manage Project - Get Route
exports.getManageProject = (req, res) => {
  res.render("admin/manageProject", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Project",
  });
};

// Manage Project - Post Route
exports.postManageProject = (req, res) => {
  res.redirect("/admin/manage-project");
};
