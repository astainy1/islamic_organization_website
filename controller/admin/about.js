// About - Get Route
exports.getAbout = (req, res) => {
  res.render("admin/about", {
    admin: req.session.admin ?? "Admin",
    title: "About Page | Salem Bakhit High School",
  });
};

// About - Post Route
exports.postAbout = (req, res) => {
  res.redirect(303, "/admin/about");
};
