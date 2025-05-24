exports.getAbout = (req, res) => {
  res.render("pages/about", { title: "About - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl });
};

exports.postAbout = (req, res) => {
    res.redirect("/about")
}
