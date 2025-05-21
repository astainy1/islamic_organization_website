// Teacher Module

// Add Teacher - Get Route
exports.getAddTeacher = (req, res) => {
  res.render("admin/addteacher", {
    admin: req.session.admin ?? "Admin",
    title: "Add Teacher | Salem Bakhit High School",
  });
};

// Add Teacher - Post Route
exports.postAddTeacher = (req, res) => {
  res.redirect("/admin/add-teacher");
};

// Manage Teacher - Get Route
exports.getManageTeacher = (req, res) => {
  res.render("admin/manageteacher", {
    admin: req.session.admin ?? "Admin",
    title: "Manager Teacher | Salem Bakhit High School",
  });
};

// Manage Teacher - Post Route
exports.postManageTeacher = (req, res) => {
  res.redirect("/admin/manage-teacher");
};

// View single Teacher - Get Route
exports.getViewSingleTeacher = (req, res) => {
  res.render("admin/viewsingleteacher", {
    admin: req.session.admin ?? "Admin",
    title: "View Teacher | Salem Bakhit High School",
  });
};

// Edit Teacher - Get Route
exports.getEditTeacher = (req, res) => {
  res.render("admin/editteacher", {
    admin: req.session.admin ?? "Admin",
    title: "Update Teacher | Salem Bakhit High School",
  });
};

// Edit Teacher - Post Route
exports.postEditTeacher = (req, res) => {
  res.redirect("/admin/edit-teacher");
};
