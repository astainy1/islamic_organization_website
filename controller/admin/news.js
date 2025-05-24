//New Module

// Add New - Get Route
exports.getAddNews = (req, res) => {
  res.render("admin/addNews", {
    admin: req.session.admin ?? "Admin",
    title: "Add News",
  });
};

// Add New - Post Route
exports.postAddNews = (req, res) => {
  res.redirect(303, "/admin/add-new");
};

// Manage All New - Get Route
exports.getManageNews = (req, res) => {
  res.render("admin/manageNews", {
    admin: req.session.admin ?? "Admin",
    title: "Manage News",
  });
}

// Edit New - Get Route
exports.getEditNew = (req, res) => {
  res.render("admin/editnew", {
    admin: req.session.admin ?? "Admin",
    title: "Edit News",
  });
};

// Edit New - Post Route
exports.postEditNew = (req, res) => {
  res.redirect(303, "/admin/view-new");
};

// View New - Get Route
exports.getViewNew = (req, res) => {
  res.render("admin/viewNew", {
    admin: req.session.admin ?? "Admin",
    title: "View New",
  });
};

// View New - Post Route
