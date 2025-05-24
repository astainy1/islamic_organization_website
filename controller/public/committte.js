exports.getCommitte = (req, res) => {
  res.render("pages/committee", {
    title: "Committe - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postCommittee = (req, res) => {
  res.redirect(303, "/committee");
};
