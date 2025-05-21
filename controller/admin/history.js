// History Page - Get Route
exports.getHistory = (req, res) => {
  res.render("admin/history", {
    admin: req.session.admin ?? "Admin",
    title: "History Page | Salem Bakhit High School",
  });
};

// History Page - Post Route
exports.postHistory = (req, res) => {
  res.redirect("/admin/history");
};
