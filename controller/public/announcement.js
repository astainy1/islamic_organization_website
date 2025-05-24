exports.getAnnouncement = (req, res) => {
  res.render("pages/announcement", {
    title: "Announcement - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl
  });
};
