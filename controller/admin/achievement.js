// Achievements Page = Get Route

exports.getAchievement = (req, res) => {
  res.render("admin/achievement", {
    admin: req.session.admin ?? "Admin",
    title: "Achievement Page | Salem Bakhit High School",
  });
};

// Achievements Page = Post Route
exports.postAchievement = (req, res) => {
  res.redirect(303, "/admin/achievement");
};
