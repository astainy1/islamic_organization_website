exports.getDirectors = (req, res) => {
  res.render("pages/directors", {
    title: "Directors - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postDirectors = (req, res) => {
  res.redirect(303, "/directors");
};
