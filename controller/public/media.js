exports.getMedia = (req, res) => {
  res.render("pages/media", {
   title: "Media - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl
  });
};

exports.postMedia = (req, res) => {
  res.redirect(303, "higher-lajinah/media");
};
