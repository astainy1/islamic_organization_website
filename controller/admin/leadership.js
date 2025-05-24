// Leader Module

// Add Leader - Get Route
exports.getAddLeader = (req, res) => {
  res.render("admin/addLeader", {
    admin: req.session.admin ?? "Admin",
    title: "Add Leader",
  });
};

// Add Leader - Post Route
exports.postAddLeader = (req, res) => {
  res.redirect("/admin/add-leader");
};

// Manage Leader - Get Route
exports.getManageLeader = (req, res) => {
  res.render("admin/manageLeader", {
    admin: req.session.admin ?? "Admin",
    title: "Manager Leader",
  });
};

// Manage Leader - Post Route
exports.postManageLeader = (req, res) => {
  res.redirect("/admin/manage-leader");
};

// View single Leader - Get Route
exports.getViewSingleLeader = (req, res) => {
  res.render("admin/viewSingleLeader", {
    admin: req.session.admin ?? "Admin",
    title: "View Leader",
  });
};

// Edit Leader - Get Route
exports.getEditLeader = (req, res) => {
  res.render("admin/editleader", {
    admin: req.session.admin ?? "Admin",
    title: "Update Leader",
  });
};

// Edit Leader - Post Route
exports.postEditLeader = (req, res) => {
  res.redirect("/admin/edit-leader");
};
