exports.getHQ = (req, res) => {
  res.render("pages/hq", {
    title: "HQ - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postHQ = (req, res) => {
  res.redirect(303, "/hq");
};
