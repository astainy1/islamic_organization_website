exports.getProject = (req, res) => {

  res.render("pages/project", {
    title: "Projects - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl
  })

};

exports.postProject = (req, res) => {
  res.redirect("higher-lajinah/project");
};

