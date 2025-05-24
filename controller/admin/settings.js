// Home Banner = Get Route
exports.getSiteSettings = (req, res) => {
  res.render("admin/siteSettings", {
    admin: req.session.admin ?? "Admin",
    title: "Site Settings",
  });
};

// Settings = Post  Route
exports.postSiteSettings = (req, res) => {
  res.redirect(303, "/admin/site-settings");
};
