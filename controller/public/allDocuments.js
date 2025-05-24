exports.getAllDocuments = (req, res) => {
  res.render("pages/allDocuments", {
    title: "All Documents - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postAllDocuments = (req, res) => {
  res.redirect(303, "/resourcess");
};
