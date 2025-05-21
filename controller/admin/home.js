// Home - Get Route
exports.getHome = (req, res) => {
  res.render("admin/home", {
    admin: req.session.admin ?? "Admin",
    title: "Home Page | Salem Bakhit High School",
  });
};

// Home - Post Route
exports.postHome = (req, res) => {
  res.redirect(303, "/admin/home");
};
