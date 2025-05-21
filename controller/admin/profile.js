// View Profile - Get Route
exports.getViewProfile = (req, res) => {
  res.render("admin/viewprofile", {
    admin: req.session.admin ?? "Admin",
    title: "User Profile | Salem Bakhit High School",
  });
};

// View Profile - Post Route
exports.postViewProfile = (req, res) => {
  res.redirect("/admin/user-profile");
};

// Edit Profile - Get Route
exports.getEditProfile = (req, res) => {
  res.render("admin/editprofile", {
    admin: req.session.admin ?? "Admin",
    title: "Edit Profile | Salem Bakhit High School",
  });
};

// Edit Profile - Post Route
exports.postEditProfile = (req, res) => {
  res.redirect("/admin/edit-profile");
};
