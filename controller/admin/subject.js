// Add Subject - Get Route
exports.getAddSubject = (req, res) => {
  res.render("admin/addsubject", {
    admin: req.session.admin ?? "Admin",
    title: "Add Subject | Salem Bakhit High School",
  });
};

// Add Subject - Post Route
exports.postAddSubject = (req, res) => {
  res.redirect(303, "/admin/add-subject");
};

// Manage Subject - Get Route
exports.getManageSubject = (req, res) => {
  res.render("admin/managesubject", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Subject | Salem Bakhit High School",
  });
};

// Manage Subject - Post Route
exports.postManageSubject = (req, res) => {
  res.redirect("/admin/manage-subject");
};
