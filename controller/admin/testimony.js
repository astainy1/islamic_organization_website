// Add Testimony - Get Route
exports.getAddTestimony = (req, res) => {
  res.render("admin/addtestimony", {
    admin: req.session.admin ?? "Admin",
    title: "Add Testimonial | Salem Bakhit High School",
  });
};

// Add Testimony - Post Route
exports.postAddTestimony = (req, res) => {
  res.redirect("/admin/add-testimony");
};

// Manage Testimony - Get Route
exports.getManageTestimony = (req, res) => {
  res.render("admin/managetestimony", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Testimonial | Salem Bakhit High School",
  });
};

exports.postManageTestimony = (req, res) => {
  res.redirect("/admin/manage-testimony");
};
