// Add Partner - Get Route
exports.getPartner = (req, res) => {
  res.render("admin/addPartner", {
    admin: req.session.admin ?? "Admin",
    title: "Add Partner",
  });
};

// Add Partner - Post Route
exports.postPartner = (req, res) => {
  res.redirect("/admin/add-partner");
};

// Manage Partner - Get Route
exports.getManagePartner = (req, res) => {
  res.render("admin/managePartner", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Partner",
  });
};

// Manage Partner - Post Route
exports.postManagePartner = (req, res) => {
  res.redirect(303, "/admin/manage-partner");
};
