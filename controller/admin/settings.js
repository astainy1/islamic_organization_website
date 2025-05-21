// Home Banner = Get Route
exports.getHomeBanner = (req, res) => {
  res.render("admin/homebanner", {
    admin: req.session.admin ?? "Admin",
    title: "Home Banner | Salem Bakhit High School",
  });
};

// Home Banner = Post  Route
exports.postHomeBanner = (req, res) => {
  res.redirect(303, "/admin/home-banner");
};

// Other Settings = Get Route
exports.getOtherSettings = (req, res) => {
  res.render("admin/othersettings", {
    admin: req.session.admin ?? "Admin",
    title: "Other Settings | Salem Bakhit High School",
  });
};

// Other Settings = Post Route
exports.postOtherSettings = (req, res) => {
  res.redirect("/admin/other-settings");
};
