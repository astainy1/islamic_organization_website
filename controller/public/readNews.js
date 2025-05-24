exports.getNewDetails = (req, res) => {
  res.render("pages/readnews", {
    title: "Read News - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postNewDetails = (req, res) => {
  res.redirect(303, "/read-new");
};