exports.getDashboard = (req, res) => {
  // console.log(req.session)
  if (!req.session.admin) return res.redirect("/admin/login");
  res.render("admin/dashboard", {
    admin: req.session.admin ?? "Admin",
    title: "Admin Dashboard",
  });
};
