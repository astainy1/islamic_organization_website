exports.getDashboard = (req, res) => {
  if (!req.session.admin) return res.redirect("/admin/login");
  res.render("admin/dashboard", {
    admin: req.session.admin ?? "Admin",
    title: "Admin Dashboard | Salem Bakhit High School",
  });
};
